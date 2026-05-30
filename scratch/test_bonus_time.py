import sys
sys.path.append("d:/Desktop/ai")

import json
import asyncio
from tornado.ioloop import IOLoop
from tornado.websocket import websocket_connect
from themes import THEME_DATABASE

async def wait_for_msg(conn, msg_type):
    while True:
        msg = json.loads(await conn.read_message())
        if msg["type"] == msg_type:
            return msg["payload"]

async def wait_for_phase(conn, phase):
    while True:
        payload = await wait_for_msg(conn, "state_update")
        if payload["phase"] == phase:
            return payload

async def run_bonus_time_test():
    print("--- STARTING BONUS TIME CONFIG AND TIMER EXTENSION TEST ---")
    
    # 1. Connect Player 1 (Host)
    print("P1 connecting...")
    p1 = await websocket_connect("ws://localhost:8000/ws")
    
    # Register P1
    await p1.write_message(json.dumps({
        "type": "register",
        "payload": {"nickname": "HostAlice", "avatar": {"bgColor": "#FFADAD", "bodyColor": "#F4A261", "eyes": 0, "mouth": 0, "accessory": 0}}
    }))
    payload = await wait_for_msg(p1, "registered")
    p1_id = payload["id"]
    print(f"P1 registered. ID: {p1_id}")
    
    # Create Lobby
    await p1.write_message(json.dumps({"type": "create_lobby"}))
    payload = await wait_for_msg(p1, "lobby_created")
    lobby_code = payload["code"]
    print(f"Lobby created with code: {lobby_code}")
    
    # 2. Connect Player 2 (Bob)
    print("P2 connecting...")
    p2 = await websocket_connect("ws://localhost:8000/ws")
    
    # Register P2
    await p2.write_message(json.dumps({
        "type": "register",
        "payload": {"nickname": "Bob", "avatar": {"bgColor": "#FFD6A5", "bodyColor": "#E76F51", "eyes": 1, "mouth": 1, "accessory": 1}}
    }))
    payload = await wait_for_msg(p2, "registered")
    p2_id = payload["id"]
    print(f"P2 registered. ID: {p2_id}")
    
    # Join Lobby
    await p2.write_message(json.dumps({
        "type": "join_lobby",
        "payload": {"code": lobby_code}
    }))
    
    # Wait for both to be in lobby state
    await wait_for_phase(p1, "LOBBY")
    lobby_state = await wait_for_phase(p2, "LOBBY")
    assert len(lobby_state["players"]) == 2
    print("Lobby joined by both players.")
    
    # Verify default settings
    assert lobby_state["settings"].get("correct_answer_bonus") == 0
    print("Default correct_answer_bonus is 0.")
    
    # 3. Update Settings: Challenge Time = 60s, Correct Answer Bonus = 5s
    print("Host updating settings to bonus = 5...")
    await p1.write_message(json.dumps({
        "type": "update_settings",
        "payload": {"challenge_time": 60, "correct_answer_bonus": 5}
    }))
    
    # Wait for settings sync
    async def wait_for_settings(conn, expected_bonus):
        while True:
            state = await wait_for_msg(conn, "state_update")
            if state["settings"].get("correct_answer_bonus") == expected_bonus:
                return state
                
    lobby_state = await wait_for_settings(p1, 5)
    await wait_for_settings(p2, 5)
    assert lobby_state["settings"].get("challenge_time") == 60
    print("Settings successfully updated and synchronized across all players.")
    
    # 4. Start Game
    print("Host starting game...")
    await p1.write_message(json.dumps({"type": "start_game"}))
    await wait_for_phase(p1, "THEME_VOTING")
    await wait_for_phase(p2, "THEME_VOTING")
    print("Game transitioned to THEME_VOTING")
    
    # Vote for Theme
    await p1.write_message(json.dumps({"type": "vote_theme", "payload": {"theme_index": 0}}))
    await p2.write_message(json.dumps({"type": "vote_theme", "payload": {"theme_index": 0}}))
    
    # Wait for BIDDING phase
    lobby_state = await wait_for_phase(p1, "BIDDING")
    await wait_for_phase(p2, "BIDDING")
    chosen_theme = lobby_state["chosen_theme"]
    active_player_id = lobby_state["active_player_id"]
    print(f"Game transitioned to BIDDING. Theme: {chosen_theme}")
    
    # Bidding: P1 bids 1, P2 calls liar (or P1 calls liar depending on order)
    active_socket = p1 if active_player_id == p1_id else p2
    inactive_socket = p2 if active_player_id == p1_id else p1
    inactive_id = p2_id if active_player_id == p1_id else p1_id
    
    print("Active player bidding 1...")
    await active_socket.write_message(json.dumps({"type": "bid", "payload": {"bid": 1}}))
    
    # Wait for bid 1 update
    async def wait_for_bid(conn, bid):
        while True:
            state = await wait_for_msg(conn, "state_update")
            if state["current_bid"] == bid:
                return state
    await wait_for_bid(p1, 1)
    await wait_for_bid(p2, 1)
    
    # Next player calls liar
    print("Next player calling liar...")
    await inactive_socket.write_message(json.dumps({"type": "call_liar"}))
    
    # Wait for CHALLENGE phase
    lobby_state = await wait_for_phase(p1, "CHALLENGE")
    await wait_for_phase(p2, "CHALLENGE")
    print("Game transitioned to CHALLENGE!")
    
    # Get initial time remaining
    initial_remaining = lobby_state["time_remaining"]
    print(f"Initial remaining time in Challenge: {initial_remaining} seconds")
    
    # Get valid items for chosen theme
    valid_db_entries = THEME_DATABASE[chosen_theme]
    valid_word = valid_db_entries[0][0]
    
    # Challenged player submits a correct word
    challenged_socket = p1 if lobby_state["challenged_id"] == p1_id else p2
    print(f"Challenged player submitting correct word: {valid_word}")
    
    # Measure time remaining right before submission and listen for timer update
    await challenged_socket.write_message(json.dumps({
        "type": "add_challenge_item",
        "payload": {"item": valid_word}
    }))
    
    # Check validation response
    val_msg = await wait_for_msg(challenged_socket, "item_validation_result")
    assert val_msg["valid"] is True
    print("Word successfully validated.")
    
    # Now check if timer_update was sent with extended remaining seconds
    timer_payload = await wait_for_msg(challenged_socket, "timer_update")
    extended_remaining = timer_payload["remaining"]
    print(f"Time remaining after correct answer: {extended_remaining} seconds")
    
    # Check that extended time increased
    assert extended_remaining > (initial_remaining - 3) + 4, f"Timer did not extend. Initial: {initial_remaining}, Extended: {extended_remaining}"
    print("SUCCESS: Timer extended by correct answer!")
    
    # Submit incorrect answer
    print("Submitting incorrect word: 'invalidwordhere'...")
    await challenged_socket.write_message(json.dumps({
        "type": "add_challenge_item",
        "payload": {"item": "invalidwordhere"}
    }))
    val_msg = await wait_for_msg(challenged_socket, "item_validation_result")
    assert val_msg["valid"] is False
    
    # Submit duplicate answer
    print(f"Submitting duplicate correct word: {valid_word}...")
    await challenged_socket.write_message(json.dumps({
        "type": "add_challenge_item",
        "payload": {"item": valid_word}
    }))
    val_msg = await wait_for_msg(challenged_socket, "item_validation_result")
    assert val_msg["valid"] is False
    
    print("Close sockets.")
    p1.close()
    p2.close()
    print("--- TIMER EXTENSION TEST PASSED SUCCESSFULLY ---")

if __name__ == "__main__":
    IOLoop.current().run_sync(run_bonus_time_test)
