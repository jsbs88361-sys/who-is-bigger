// Simple synthesized retro-game sound effects using Web Audio API
// This avoids downloading external audio assets and runs completely client-side.

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    // Resume context if suspended (browser security)
    if (audioCtx.state === "suspended") {
        audioCtx.resume();
    }
    return audioCtx;
}

export const playSound = {
    click: () => {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(600, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
            
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.08);
        } catch (e) {
            console.warn("Sound blocked or unsupported", e);
        }
    },
    
    tick: () => {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "triangle";
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            console.warn(e);
        }
    },
    
    bid: () => {
        try {
            const ctx = getAudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = "sine";
            osc.frequency.setValueAtTime(350, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.15);
            
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {
            console.warn(e);
        }
    },
    
    liar: () => {
        try {
            const ctx = getAudioContext();
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            
            osc1.type = "sawtooth";
            osc2.type = "sawtooth";
            
            // Dissonant frequencies for warning/buzzer sound
            osc1.frequency.setValueAtTime(150, ctx.currentTime);
            osc2.frequency.setValueAtTime(153, ctx.currentTime);
            
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.2);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            
            osc1.start();
            osc2.start();
            osc1.stop(ctx.currentTime + 0.4);
            osc2.stop(ctx.currentTime + 0.4);
        } catch (e) {
            console.warn(e);
        }
    },
    
    success: () => {
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;
            
            const playNote = (freq, time, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = "triangle";
                osc.frequency.setValueAtTime(freq, time);
                gain.gain.setValueAtTime(0.1, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                osc.start(time);
                osc.stop(time + duration);
            };
            
            // Ascending chord (arpeggio)
            playNote(261.63, now, 0.15);      // C4
            playNote(329.63, now + 0.08, 0.15); // E4
            playNote(392.00, now + 0.16, 0.15); // G4
            playNote(523.25, now + 0.24, 0.3);  // C5
        } catch (e) {
            console.warn(e);
        }
    },
    
    fail: () => {
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;
            
            const playNote = (freq, time, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(freq, time);
                gain.gain.setValueAtTime(0.1, time);
                gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
                osc.start(time);
                osc.stop(time + duration);
            };
            
            // Descending sad chord
            playNote(220.00, now, 0.2);       // A3
            playNote(207.65, now + 0.12, 0.2); // G#3
            playNote(196.00, now + 0.24, 0.2); // G3
            playNote(164.81, now + 0.36, 0.4); // E3
        } catch (e) {
            console.warn(e);
        }
    }
};
