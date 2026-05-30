import os
import json
import random
import uuid
import re
import tornado.ioloop
import tornado.web
import tornado.websocket
from themes import THEME_DATABASE

THEMES = list(THEME_DATABASE.keys())

def normalize_word(word):
    if not word:
        return ""
    # Convert to string, lowercase, strip spaces
    w = str(word).lower().strip()
    # Replace Cyrillic ё and э with Cyrillic е
    w = w.replace('ё', 'е').replace('э', 'е')
    # Strip spaces, hyphens, and other punctuation, preserving only alphanumeric, + and #
    w = re.sub(r'[^a-zа-я0-9+#]', '', w)
    return w

def get_game_franchise(name):
    # Lowercase & strip
    n = name.lower().strip()
    
    # Strip leading "the "
    if n.startswith("the "):
        n = n[4:]
        
    # Standard substitutions for punctuation/spelling
    n = n.replace("s.t.a.l.k.e.r.", "stalker")
    n = n.replace("half-life", "half life")
    n = n.replace("assassin's creed", "assassins creed")
    n = n.replace("baldur's gate", "baldurs gate")
    n = n.replace("plants vs. zombies", "plants vs zombies")
    
    # Replace punctuation with spaces
    n = re.sub(r'[^a-z0-9а-я\s]', ' ', n)
    n = " ".join(n.split())
    
    # List of known multi-word prefixes that denote a series/franchise
    prefixes = [
        "far cry",
        "grand theft auto",
        "call of duty",
        "assassins creed",
        "need for speed",
        "resident evil",
        "silent hill",
        "tomb raider",
        "devil may cry",
        "half life",
        "left 4 dead",
        "mass effect",
        "red dead redemption",
        "elder scrolls",
        "battlefield",
        "star wars",
        "mortal kombat",
        "dark souls",
        "borderlands",
        "civilization",
        "diablo",
        "warcraft",
        "starcraft",
        "doom",
        "quake",
        "wolfenstein",
        "witcher",
        "super mario",
        "mario",
        "legend of zelda",
        "zelda",
        "final fantasy",
        "monster hunter",
        "metal gear",
        "god of war",
        "halo",
        "gears of war",
        "forza horizon",
        "forza",
        "gran turismo",
        "street fighter",
        "tekken",
        "sims",
        "hitman",
        "max payne",
        "splinter cell",
        "watch dogs",
        "cyberpunk",
        "dragon age",
        "dead space",
        "bioshock",
        "crysis",
        "dishonored",
        "deus ex",
        "payday",
        "just cause",
        "cossacks",
        "heroes of might and magic",
        "might and magic",
        "total war",
        "age of empires",
        "command and conquer",
        "command & conquer",
        "serious sam",
        "postal",
        "duke nukem",
        "team fortress",
        "counter strike",
        "portal",
        "gta",
        "cod",
        "nfs",
        "rdr",
        "dmc",
        "tes",
        "mk",
        "fifa",
        "pes",
        "ea sports fc",
        "fallout",
        "metro",
        "stalker",
        "detroit",
        "alan wake",
        "mafia",
        "little nightmares",
        "hades",
        "plants vs zombies",
        "angry birds",
        "subway surfers",
        "temple run",
        "cut the rope",
        "doodle jump",
        "fruit ninja",
        "jetpack joyride",
        "clash of clans",
        "clash royale",
        "among us",
        "fall guys",
        "roblox",
        "minecraft",
        "dota",
        "league of legends",
        "world of tanks",
        "world of warcraft",
        "valorant",
        "apex legends",
        "fortnite",
        "pubg",
        "rust",
        "ark",
        "dayz",
        "terraria",
        "starbound",
        "valheim",
        "forest",
        "subnautica",
        "dying light",
        "outlast",
        "amnesia",
        "soma",
        "dead by daylight",
        "phasmophobia",
        "lethal company",
        "binding of isaac",
        "enter the gungeon",
        "dead cells",
        "hades",
        "slay the spire",
        "vampire survivors",
        "risk of rain",
        "hotline miami",
        "katana zero",
        "ruiner",
        "ghostrunner",
        "superhot",
        "talos principle",
        "witness",
        "limbo",
        "inside",
        "little nightmares",
        "ori and the",
        "ori",
        "cuphead",
        "celeste",
        "hollow knight",
        "shovel knight",
        "rogue legacy",
        "undertale",
        "deltarune",
        "omori",
        "disco elysium",
        "baldurs gate",
        "divinity original sin",
        "divinity",
        "pillars of eternity",
        "pathfinder",
        "wasteland",
        "outer worlds",
        "starfield",
        "oblivion",
        "morrowind",
        "gothic",
        "risen",
        "elex",
        "fable",
        "kingdom come",
        "mount and blade",
        "crusader kings",
        "europa universalis",
        "hearts of iron",
        "victoria",
        "stellaris",
        "age of mythology",
        "rise of nations",
        "empire earth",
        "stronghold",
        "settlers",
        "anno",
        "tropico",
        "simcity",
        "cities skylines",
        "transport fever",
        "railway empire",
        "two point",
        "rollercoaster tycoon",
        "planet coaster",
        "planet zoo",
        "zoo tycoon",
        "jurassic world",
        "theme park",
        "dungeon keeper",
        "evil genius",
        "spore",
        "singles",
        "virtual villagers",
        "second life",
        "imvu",
        "habbo",
        "club penguin",
        "animal crossing",
        "stardew valley",
        "harvest moon",
        "story of seasons",
        "rune factory",
        "my time at",
        "disney dreamlight",
        "slime rancher",
        "dave the diver",
        "abzu",
        "journey",
        "flower",
        "death stranding"
    ]
    
    # Sort prefixes by length descending so that we match the longest prefix first!
    prefixes = sorted(list(set(prefixes)), key=len, reverse=True)
    
    for prefix in prefixes:
        # Match prefix at the beginning followed by a space, digit, punctuation, or end of string
        # e.g. "far cry 3" starts with "far cry"
        if n.startswith(prefix):
            # Check if it is followed by space, digit, colon, hyphen, or end of string
            rest = n[len(prefix):]
            if not rest or rest[0] in " 0123456789:-.#'\"":
                return prefix
                
    # If no prefix matched, split by space/punctuation and take the first word as the franchise
    # But clean up first word
    words = re.findall(r'[a-zа-я0-9]+', n)
    if words:
        return words[0]
        
    return n


def validate_challenge_items(theme_name, items):
    db_items = THEME_DATABASE.get(theme_name, [])
    # Normalize all database entries: list of sets of normalized aliases
    normalized_db = []
    for entry in db_items:
        normalized_db.append({normalize_word(alias) for alias in entry})
        
    results = []
    matched_indices = set()
    
    for item in items:
        norm_item = normalize_word(item)
        if not norm_item:
            continue
            
        matched = False
        for idx, alias_set in enumerate(normalized_db):
            if idx in matched_indices:
                continue
            if norm_item in alias_set:
                matched = True
                matched_indices.add(idx)
                break
                
        results.append({
            "item": item,
            "valid": matched
        })
    return results


# Keep track of active lobbies
# Lobbies structure:
# lobby_code: {
#     "code": str,
#     "players": { player_id: { "id", "name", "avatar", "socket", "is_host", "score" } },
#     "settings": { "challenge_time": int (in seconds) },
#     "state": {
#         "phase": str,              # LOBBY, THEME_VOTING, BIDDING, CHALLENGE, REVIEW, SCOREBOARD
#         "timer_end": float,        # timestamp when current phase ends
#         "active_player_id": str,   # for BIDDING phase
#         "current_bid": int,
#         "current_bidder_id": str,
#         "last_bidder_id": str,
#         "challenged_id": str,
#         "challenger_id": str,
#         "chosen_theme": str,
#         "themes_to_vote": list,
#         "votes": dict,             # player_id -> index of theme
#         "challenge_items": list,   # list of strings written by the challenged player
#         "reviews": dict,           # reviewer_id -> list of bools
#         "players_order": list      # list of player_ids representing turn order
#     },
#     "timer_handle": None          # Tornado timeout handle to cancel active timer
# }
LOBBIES = {}

# Keep track of sockets to player info
# socket_instance: { "player_id", "lobby_code" }
SOCKETS_MAP = {}

def get_lobby_state(lobby):
    """Returns a JSON-serializable representation of the lobby state suitable for clients."""
    players_data = []
    for p_id, p in lobby["players"].items():
        players_data.append({
            "id": p["id"],
            "name": p["name"],
            "avatar": p["avatar"],
            "is_host": p["is_host"],
            "score": p["score"],
            "connected": p["socket"] is not None
        })
    
    # Send time remaining if active
    remaining = 0
    if lobby["state"]["timer_end"] > 0:
        remaining = max(0, int(lobby["state"]["timer_end"] - tornado.ioloop.IOLoop.current().time()))

    return {
        "code": lobby["code"],
        "players": players_data,
        "settings": lobby["settings"],
        "phase": lobby["state"]["phase"],
        "time_remaining": remaining,
        "active_player_id": lobby["state"]["active_player_id"],
        "current_bid": lobby["state"]["current_bid"],
        "current_bidder_id": lobby["state"]["current_bidder_id"],
        "last_bidder_id": lobby["state"]["last_bidder_id"],
        "challenged_id": lobby["state"]["challenged_id"],
        "challenger_id": lobby["state"]["challenger_id"],
        "chosen_theme": lobby["state"]["chosen_theme"],
        "themes_to_vote": lobby["state"]["themes_to_vote"],
        "votes": lobby["state"]["votes"],
        "challenge_items": lobby["state"]["challenge_items"],
        "reviews": { pid: revs for pid, revs in lobby["state"]["reviews"].items() },
        "players_order": lobby["state"]["players_order"]
    }

def broadcast_to_lobby(lobby, msg_type, payload):
    """Sends a message to all connected players in a lobby."""
    message = json.dumps({"type": msg_type, "payload": payload})
    for p in lobby["players"].values():
        if p["socket"]:
            try:
                p["socket"].write_message(message)
            except Exception:
                pass

def cancel_lobby_timer(lobby):
    if lobby["timer_handle"]:
        tornado.ioloop.IOLoop.current().remove_timeout(lobby["timer_handle"])
        lobby["timer_handle"] = None
    lobby["state"]["timer_end"] = 0

def start_lobby_timer(lobby, duration_seconds, callback):
    cancel_lobby_timer(lobby)
    
    loop = tornado.ioloop.IOLoop.current()
    lobby["state"]["timer_end"] = loop.time() + duration_seconds
    
    def wrapped_callback():
        lobby["timer_handle"] = None
        lobby["state"]["timer_end"] = 0
        callback()

    lobby["timer_handle"] = loop.add_timeout(loop.time() + duration_seconds, wrapped_callback)
    
    # Broadcast timer update
    broadcast_to_lobby(lobby, "timer_update", {"remaining": duration_seconds})

def transition_to_theme_voting(lobby):
    cancel_lobby_timer(lobby)
    lobby["state"]["phase"] = "THEME_VOTING"
    # Choose 4 random themes
    lobby["state"]["themes_to_vote"] = random.sample(THEMES, 4)
    lobby["state"]["votes"] = {}
    lobby["state"]["chosen_theme"] = ""
    lobby["state"]["current_bid"] = 0
    lobby["state"]["current_bidder_id"] = ""
    lobby["state"]["last_bidder_id"] = ""
    lobby["state"]["challenged_id"] = ""
    lobby["state"]["challenger_id"] = ""
    lobby["state"]["challenge_items"] = []
    lobby["state"]["reviews"] = {}
    
    # Determine playing order (shuffle initially, but keep consistent for the game round)
    p_ids = list(lobby["players"].keys())
    # Only include connected players in gameplay
    active_p_ids = [pid for pid in p_ids if lobby["players"][pid]["socket"] is not None]
    random.shuffle(active_p_ids)
    lobby["state"]["players_order"] = active_p_ids
    
    broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
    
    # 10s timer for voting
    start_lobby_timer(lobby, 10, lambda: end_theme_voting(lobby))

def end_theme_voting(lobby):
    cancel_lobby_timer(lobby)
    votes = lobby["state"]["votes"]
    themes = lobby["state"]["themes_to_vote"]
    
    # Count votes for each theme index (0 to 3)
    counts = [0] * 4
    for theme_idx in votes.values():
        if 0 <= theme_idx < 4:
            counts[theme_idx] += 1
            
    # Find max votes
    max_votes = max(counts)
    # Get all themes that have the max votes
    winning_indices = [i for i, count in enumerate(counts) if count == max_votes]
    
    # If tie, random choice from winners
    chosen_idx = random.choice(winning_indices)
    lobby["state"]["chosen_theme"] = themes[chosen_idx]
    
    # Move to Bidding
    transition_to_bidding(lobby)

def transition_to_bidding(lobby):
    cancel_lobby_timer(lobby)
    lobby["state"]["phase"] = "BIDDING"
    lobby["state"]["current_bid"] = 0
    lobby["state"]["current_bidder_id"] = ""
    lobby["state"]["last_bidder_id"] = ""
    
    # Set active player to first player in order
    if len(lobby["state"]["players_order"]) > 0:
        lobby["state"]["active_player_id"] = lobby["state"]["players_order"][0]
        broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
        # Start turn timer: 30s
        start_lobby_timer(lobby, 30, lambda: handle_bidding_timeout(lobby))
    else:
        # Fallback if no players
        lobby["state"]["phase"] = "LOBBY"
        broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))

def handle_bidding_timeout(lobby):
    # Auto-resolve bid timeout
    # User said: "если кто то после предыдущего скажет ложь(выбирается автоматически после 30 секунд)"
    # If it's the first turn, they can't call Liar (no bid yet). We auto-bid 1.
    # Otherwise, they auto-call Liar on the previous bidder.
    active_id = lobby["state"]["active_player_id"]
    current_bid = lobby["state"]["current_bid"]
    
    if current_bid == 0:
        # First turn auto-bid 1
        lobby["state"]["current_bid"] = 1
        lobby["state"]["current_bidder_id"] = active_id
        next_turn(lobby)
    else:
        # Auto-call liar
        handle_liar_call(lobby, active_id)

def next_turn(lobby):
    # Move active player to the next one in the order
    order = lobby["state"]["players_order"]
    current_id = lobby["state"]["active_player_id"]
    
    if current_id in order:
        idx = order.index(current_id)
        next_idx = (idx + 1) % len(order)
        lobby["state"]["active_player_id"] = order[next_idx]
    else:
        # Fallback
        lobby["state"]["active_player_id"] = order[0] if len(order) > 0 else ""
        
    broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
    start_lobby_timer(lobby, 30, lambda: handle_bidding_timeout(lobby))

def handle_liar_call(lobby, challenger_id):
    cancel_lobby_timer(lobby)
    # The player challenged is the one who made the current bid
    challenged_id = lobby["state"]["current_bidder_id"]
    
    if not challenged_id:
        # Fallback if somehow liar is called without a bid
        transition_to_bidding(lobby)
        return
        
    lobby["state"]["phase"] = "CHALLENGE"
    lobby["state"]["challenged_id"] = challenged_id
    lobby["state"]["challenger_id"] = challenger_id
    lobby["state"]["challenge_items"] = []
    lobby["state"]["reviews"] = {}
    
    broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
    
    # Start challenge timer (configured by host, default 60s, bounds: 30s to 10m)
    duration = lobby["settings"].get("challenge_time", 60)
    start_lobby_timer(lobby, duration, lambda: end_challenge(lobby))

def end_challenge(lobby):
    cancel_lobby_timer(lobby)
    
    # Transition to Reveal (REVIEW) phase
    lobby["state"]["phase"] = "REVIEW"
    lobby["state"]["reviews"] = {}
    broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
    
    # 15 seconds for players to look at the automated check results
    start_lobby_timer(lobby, 15, lambda: end_review(lobby))

def end_review(lobby):
    cancel_lobby_timer(lobby)
    
    validated_items = lobby["state"]["challenge_items"] # list of dicts: {"item", "valid"}
    bid = lobby["state"]["current_bid"]
    challenged_id = lobby["state"]["challenged_id"]
    challenger_id = lobby["state"]["challenger_id"]
    
    # Count accepted items (valid == True)
    accepted_count = sum(1 for item in validated_items if item["valid"])
    
    # Determine round outcome
    success = accepted_count >= bid
    
    # Adjust scores
    if success:
        if challenged_id in lobby["players"]:
            lobby["players"][challenged_id]["score"] += 2
        if challenger_id in lobby["players"]:
            lobby["players"][challenger_id]["score"] = max(0, lobby["players"][challenger_id]["score"] - 1)
    else:
        if challenged_id in lobby["players"]:
            lobby["players"][challenged_id]["score"] = max(0, lobby["players"][challenged_id]["score"] - 1)
        if challenger_id in lobby["players"]:
            lobby["players"][challenger_id]["score"] += 2
            
    lobby["state"]["phase"] = "SCOREBOARD"
    
    # Build items_status format for backwards compatibility with round_result broadcast
    items_status = []
    for item in validated_items:
        items_status.append({
            "item": item["item"],
            "valid": item["valid"]
        })
        
    # Broadcast results
    results = {
        "success": success,
        "accepted_count": accepted_count,
        "target_count": bid,
        "items_status": items_status,
        "challenged_id": challenged_id,
        "challenger_id": challenger_id
    }
    
    broadcast_to_lobby(lobby, "round_result", results)
    broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))


def leave_lobby(player_id, lobby_code):
    if lobby_code not in LOBBIES:
        return
    lobby = LOBBIES[lobby_code]
    
    if player_id in lobby["players"]:
        player = lobby["players"][player_id]
        
        # Completely delete the player from the lobby
        del lobby["players"][player_id]
        
        # Check if all players are gone
        if len(lobby["players"]) == 0:
            cancel_lobby_timer(lobby)
            del LOBBIES[lobby_code]
            print(f"Lobby {lobby_code} deleted (all players left/disconnected).")
        else:
            # If the leaving player was host, assign a new host
            if player["is_host"]:
                # Find first player to make host
                for p in lobby["players"].values():
                    p["is_host"] = True
                    break
            
            # If currently in game, check if we need to adjust game state
            phase = lobby["state"]["phase"]
            
            # Remove from players_order
            if player_id in lobby["state"]["players_order"]:
                lobby["state"]["players_order"].remove(player_id)
                
            if phase == "BIDDING":
                if lobby["state"]["active_player_id"] == player_id:
                    # Skip their turn
                    cancel_lobby_timer(lobby)
                    if len(lobby["state"]["players_order"]) > 0:
                        transition_to_bidding(lobby)
                    else:
                        lobby["state"]["phase"] = "LOBBY"
                        broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            elif phase == "CHALLENGE":
                if lobby["state"]["challenged_id"] == player_id:
                    # Challenged player left, they automatically fail!
                    cancel_lobby_timer(lobby)
                    lobby["state"]["challenge_items"] = []
                    end_challenge(lobby)
            elif phase == "REVIEW":
                # Check if we should end early now since a player left
                check_all_votes_submitted(lobby)
                
            broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))

def check_all_votes_submitted(lobby):
    # Other players who need to vote
    challenged_id = lobby["state"]["challenged_id"]
    active_reviewers = [pid for pid in lobby["players"].keys() if pid != challenged_id and lobby["players"][pid]["socket"] is not None]
    
    # Check if everyone voted
    all_voted = True
    for pid in active_reviewers:
        if pid not in lobby["state"]["reviews"]:
            all_voted = False
            break
            
    if all_voted and len(active_reviewers) > 0:
        end_review(lobby)

class GameWebSocketHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True # For local development and easy running

    def open(self):
        self.player_id = str(uuid.uuid4())
        self.lobby_code = None
        self.registered = False
        self.nickname = "Anon"
        self.avatar = {}
        print(f"WS Open: {self.player_id}")

    def on_message(self, message):
        try:
            data = json.loads(message)
        except Exception:
            return
            
        msg_type = data.get("type")
        payload = data.get("payload", {})
        
        if msg_type == "register":
            self.nickname = payload.get("nickname", "Anon")[:16] # Max 16 chars
            self.avatar = payload.get("avatar", {})
            self.registered = True
            self.write_message(json.dumps({
                "type": "registered",
                "payload": {"id": self.player_id, "nickname": self.nickname}
            }))
            
        elif msg_type == "create_lobby":
            if not self.registered:
                return
            # Generate 4-letter unique room code
            code = "".join(random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ") for _ in range(4))
            while code in LOBBIES:
                code = "".join(random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ") for _ in range(4))
                
            LOBBIES[code] = {
                "code": code,
                "players": {
                    self.player_id: {
                        "id": self.player_id,
                        "name": self.nickname,
                        "avatar": self.avatar,
                        "socket": self,
                        "is_host": True,
                        "score": 0
                    }
                },
                "settings": {
                    "challenge_time": 60 # default 60s
                },
                "state": {
                    "phase": "LOBBY",
                    "timer_end": 0,
                    "active_player_id": "",
                    "current_bid": 0,
                    "current_bidder_id": "",
                    "last_bidder_id": "",
                    "challenged_id": "",
                    "challenger_id": "",
                    "chosen_theme": "",
                    "themes_to_vote": [],
                    "votes": {},
                    "challenge_items": [],
                    "reviews": {},
                    "players_order": []
                },
                "timer_handle": None
            }
            self.lobby_code = code
            SOCKETS_MAP[self] = {"player_id": self.player_id, "lobby_code": code}
            
            # Send initial state
            self.write_message(json.dumps({
                "type": "lobby_created",
                "payload": get_lobby_state(LOBBIES[code])
            }))
            
        elif msg_type == "join_lobby":
            if not self.registered:
                return
            code = payload.get("code", "").upper().strip()
            if code not in LOBBIES:
                self.write_message(json.dumps({"type": "error", "payload": "Комната не найдена"}))
                return
                
            lobby = LOBBIES[code]
            # Max 5 players
            active_players_count = sum(1 for p in lobby["players"].values() if p["socket"] is not None)
            if active_players_count >= 5:
                self.write_message(json.dumps({"type": "error", "payload": "Комната уже заполнена (макс. 5 игроков)"}))
                return
                
            if lobby["state"]["phase"] != "LOBBY":
                self.write_message(json.dumps({"type": "error", "payload": "Игра в этой комнате уже началась"}))
                return
                
            # If player is reconnecting
            if self.player_id in lobby["players"]:
                lobby["players"][self.player_id]["socket"] = self
                lobby["players"][self.player_id]["name"] = self.nickname
                lobby["players"][self.player_id]["avatar"] = self.avatar
            else:
                lobby["players"][self.player_id] = {
                    "id": self.player_id,
                    "name": self.nickname,
                    "avatar": self.avatar,
                    "socket": self,
                    "is_host": False,
                    "score": 0
                }
                
            self.lobby_code = code
            SOCKETS_MAP[self] = {"player_id": self.player_id, "lobby_code": code}
            
            # Notify everyone in the lobby
            broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            
        elif msg_type == "update_settings":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            # Verify host status
            player = lobby["players"].get(self.player_id)
            if not player or not player["is_host"]:
                return
                
            t = int(payload.get("challenge_time", 60))
            t = max(30, min(600, t)) # 30s to 10m bounds
            lobby["settings"]["challenge_time"] = t
            broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            
        elif msg_type == "start_game":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            player = lobby["players"].get(self.player_id)
            if not player or not player["is_host"]:
                return
                
            # Need at least 2 players to start
            active_players_count = sum(1 for p in lobby["players"].values() if p["socket"] is not None)
            if active_players_count < 2:
                self.write_message(json.dumps({"type": "error", "payload": "Для игры нужно хотя бы 2 игрока"}))
                return
                
            transition_to_theme_voting(lobby)
            
        elif msg_type == "vote_theme":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "THEME_VOTING":
                return
                
            theme_idx = int(payload.get("theme_index", -1))
            if 0 <= theme_idx < 4:
                lobby["state"]["votes"][self.player_id] = theme_idx
                broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
                
                # Check if all connected players voted
                connected_players = [pid for pid, p in lobby["players"].items() if p["socket"] is not None]
                if len(lobby["state"]["votes"]) >= len(connected_players):
                    end_theme_voting(lobby)
                    
        elif msg_type == "bid":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "BIDDING":
                return
            if lobby["state"]["active_player_id"] != self.player_id:
                return
                
            bid_val = int(payload.get("bid", 0))
            current_bid = lobby["state"]["current_bid"]
            
            # Bid must be higher, and at least 1 if first turn
            if bid_val > current_bid and bid_val >= 1:
                lobby["state"]["last_bidder_id"] = lobby["state"]["current_bidder_id"]
                lobby["state"]["current_bid"] = bid_val
                lobby["state"]["current_bidder_id"] = self.player_id
                next_turn(lobby)
                
        elif msg_type == "call_liar":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "BIDDING":
                return
            if lobby["state"]["active_player_id"] != self.player_id:
                return
            if lobby["state"]["current_bid"] == 0:
                return # Cannot call liar on first turn (no bid yet)
                
            handle_liar_call(lobby, self.player_id)
            
        elif msg_type == "add_challenge_item":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "CHALLENGE":
                return
            if lobby["state"]["challenged_id"] != self.player_id:
                return
                
            word = str(payload.get("item", "")).strip()
            if not word:
                return
                
            theme = lobby["state"]["chosen_theme"]
            current_items = lobby["state"]["challenge_items"] # list of dicts: {"item", "valid"}
            
            # Check if already added
            already_exists = any(x["item"].lower() == word.lower() for x in current_items)
            if already_exists:
                self.write_message(json.dumps({
                    "type": "item_validation_result",
                    "payload": {"item": word, "valid": False, "reason": "Уже добавлено!"}
                }))
                return
                
            # Perform single validation using themes database
            db_items = THEME_DATABASE.get(theme, [])
            normalized_db = []
            for entry in db_items:
                normalized_db.append({normalize_word(alias) for alias in entry})
                
            matched_indices = set()
            for existing in current_items:
                if existing["valid"]:
                    norm_existing = normalize_word(existing["item"])
                    for idx, alias_set in enumerate(normalized_db):
                        if norm_existing in alias_set:
                            matched_indices.add(idx)
                            break
                            
            norm_word = normalize_word(word)
            matched = False
            for idx, alias_set in enumerate(normalized_db):
                if idx in matched_indices:
                    continue
                if norm_word in alias_set:
                    matched = True
                    break
                    
            if matched:
                if theme == "Игры на ПК и консолях":
                    # Check franchise limit
                    matched_std_name = db_items[idx][0]
                    matched_franchise = get_game_franchise(matched_std_name)
                    
                    franchise_count = 0
                    for existing in current_items:
                        if existing["valid"]:
                            existing_norm = normalize_word(existing["item"])
                            existing_idx = -1
                            for e_idx, alias_set in enumerate(normalized_db):
                                if existing_norm in alias_set:
                                    existing_idx = e_idx
                                    break
                            if existing_idx != -1:
                                existing_std_name = db_items[existing_idx][0]
                                existing_franchise = get_game_franchise(existing_std_name)
                                if existing_franchise == matched_franchise:
                                    franchise_count += 1
                                    
                    if franchise_count >= 2:
                        self.write_message(json.dumps({
                            "type": "item_validation_result",
                            "payload": {
                                "item": word,
                                "valid": False,
                                "reason": f"Максимум 2 части одной серии ({matched_franchise.upper()})!"
                            }
                        }))
                        return

                lobby["state"]["challenge_items"].append({"item": word, "valid": True})
                self.write_message(json.dumps({
                    "type": "item_validation_result",
                    "payload": {"item": word, "valid": True}
                }))
                broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            else:
                self.write_message(json.dumps({
                    "type": "item_validation_result",
                    "payload": {"item": word, "valid": False, "reason": "Неверно!"}
                }))
                
        elif msg_type == "remove_challenge_item":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "CHALLENGE":
                return
            if lobby["state"]["challenged_id"] != self.player_id:
                return
                
            idx = int(payload.get("index", -1))
            items = lobby["state"]["challenge_items"]
            if 0 <= idx < len(items):
                items.pop(idx)
                broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))

        elif msg_type == "submit_items":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "CHALLENGE":
                return
            if lobby["state"]["challenged_id"] != self.player_id:
                return
                
            end_challenge(lobby)
            
        elif msg_type == "vote_items":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            if lobby["state"]["phase"] != "REVIEW":
                return
            if self.player_id == lobby["state"]["challenged_id"]:
                return # Challenged player can't vote on their own list
                
            votes = payload.get("votes", []) # list of bools corresponding to items
            lobby["state"]["reviews"][self.player_id] = votes
            broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            
            # Check if all other players voted
            check_all_votes_submitted(lobby)
            
        elif msg_type == "skip_reveal":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            player = lobby["players"].get(self.player_id)
            if player and player["is_host"] and lobby["state"]["phase"] == "REVIEW":
                end_review(lobby)
            
        elif msg_type == "next_round":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            player = lobby["players"].get(self.player_id)
            if not player or not player["is_host"]:
                return
            if lobby["state"]["phase"] != "SCOREBOARD":
                return
                
            transition_to_theme_voting(lobby)
            
        elif msg_type == "play_again":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            player = lobby["players"].get(self.player_id)
            if not player or not player["is_host"]:
                return
            if lobby["state"]["phase"] != "SCOREBOARD":
                return
                
            # Reset scores and transition back to lobby screen
            for p in lobby["players"].values():
                p["score"] = 0
                
            cancel_lobby_timer(lobby)
            lobby["state"]["phase"] = "LOBBY"
            lobby["state"]["chosen_theme"] = ""
            lobby["state"]["current_bid"] = 0
            lobby["state"]["current_bidder_id"] = ""
            lobby["state"]["last_bidder_id"] = ""
            lobby["state"]["challenged_id"] = ""
            lobby["state"]["challenger_id"] = ""
            lobby["state"]["challenge_items"] = []
            lobby["state"]["reviews"] = {}
            lobby["state"]["votes"] = {}
            lobby["state"]["players_order"] = []
            
            broadcast_to_lobby(lobby, "state_update", get_lobby_state(lobby))
            
        elif msg_type == "kick_player":
            if not self.lobby_code or self.lobby_code not in LOBBIES:
                return
            lobby = LOBBIES[self.lobby_code]
            player = lobby["players"].get(self.player_id)
            if not player or not player["is_host"]:
                return
                
            target_id = payload.get("player_id")
            if target_id == self.player_id:
                return
                
            if target_id in lobby["players"]:
                target_player = lobby["players"][target_id]
                target_socket = target_player["socket"]
                if target_socket:
                    try:
                        target_socket.write_message(json.dumps({
                            "type": "kicked",
                            "payload": "Вы были исключены из комнаты хозяином"
                        }))
                        target_socket.close()
                    except Exception:
                        pass
                else:
                    leave_lobby(target_id, self.lobby_code)

    def on_close(self):
        print(f"WS Close: {self.player_id}")
        if self in SOCKETS_MAP:
            info = SOCKETS_MAP[self]
            leave_lobby(info["player_id"], info["lobby_code"])
            del SOCKETS_MAP[self]


def make_app():
    static_path = os.path.join(os.path.dirname(__file__), "static")
    return tornado.web.Application([
        (r"/ws", GameWebSocketHandler),
        (r"/(.*)", tornado.web.StaticFileHandler, {"path": static_path, "default_filename": "index.html"}),
    ], debug=True)

if __name__ == "__main__":
    app = make_app()
    port = int(os.environ.get("PORT", 8000))
    app.listen(port)
    print(f"Game server running on http://localhost:{port}")
    tornado.ioloop.IOLoop.current().start()
