/**
 * AUDIO-FX.JS
 * Futuristic Web Audio API Sound Synthesizer
 * Zero external MP3/WAV assets required
 * Developed for Rijwal VP Portfolio
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isMuted = localStorage.getItem('rijwal_audio_muted') !== 'false'; // Default muted for accessibility

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  const AudioFX = {
    isMuted: () => isMuted,

    toggleMute: function () {
      isMuted = !isMuted;
      localStorage.setItem('rijwal_audio_muted', isMuted);
      this.updateUI();
      if (!isMuted) {
        this.playBeep(880, 0.08, 'sine');
      }
      return isMuted;
    },

    setMuted: function (muted) {
      isMuted = muted;
      localStorage.setItem('rijwal_audio_muted', isMuted);
      this.updateUI();
    },

    updateUI: function () {
      const btn = document.getElementById('sound-toggle-btn');
      const text = document.getElementById('sound-toggle-text');
      const icon = document.getElementById('sound-toggle-icon');
      if (btn) {
        if (isMuted) {
          btn.classList.remove('active');
          if (text) text.textContent = 'SOUND: OFF';
          if (icon) icon.setAttribute('data-lucide', 'volume-x');
        } else {
          btn.classList.add('active');
          if (text) text.textContent = 'SOUND: ON';
          if (icon) icon.setAttribute('data-lucide', 'volume-2');
        }
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    },

    playClick: function () {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } catch (e) {}
    },

    playPulse: function () {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch (e) {}
    },

    playBeep: function (freq = 900, duration = 0.06, type = 'sine') {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    },

    playAccessGranted: function () {
      if (isMuted) return;
      this.playBeep(587.33, 0.08); // D5
      setTimeout(() => this.playBeep(880, 0.15), 90); // A5
    }
  };

  window.AudioFX = AudioFX;

  // Initialize UI on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    AudioFX.updateUI();
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        AudioFX.toggleMute();
      });
    }

    // Attach subtle click feedback to interactive buttons & links
    document.querySelectorAll('.btn-cyber, .nav-link, .filter-btn, .action-btn').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        AudioFX.playClick();
      });
    });
  });
})();
