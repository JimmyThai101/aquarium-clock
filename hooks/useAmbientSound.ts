"use client";

import { useEffect } from "react";
import { useSyncExternalStore } from "react";
import { STORAGE_KEYS } from "@/config/aquarium";
import { storageGet, storageSet } from "@/lib/storage";

const SOUND_EVENT = "aquarium-clock-sound-change";

function subscribeSound(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SOUND_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SOUND_EVENT, onChange);
  };
}

function readSound(): boolean {
  return storageGet(STORAGE_KEYS.sound) === "on";
}

function playBubble(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(520 + Math.random() * 380, now);
  osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);
  gain.gain.setValueAtTime(0.028, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

/**
 * Optional underwater wash + bubble pops. Off until the user turns it on
 * (the click also unlocks AudioContext in browsers).
 */
export function useAmbientSound() {
  const enabled = useSyncExternalStore(subscribeSound, readSound, () => false);

  useEffect(() => {
    if (!enabled) return;

    let ctx: AudioContext;
    try {
      ctx = new AudioContext();
    } catch {
      storageSet(STORAGE_KEYS.sound, "off");
      window.dispatchEvent(new Event(SOUND_EVENT));
      return;
    }

    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 380;

      const gain = ctx.createGain();
      gain.gain.value = 0.035;

      noise.connect(filter).connect(gain).connect(ctx.destination);
      void ctx.resume();
      noise.start();

      let bubbleTimer = 0;
      const scheduleBubble = () => {
        try {
          playBubble(ctx);
        } catch {
          // Audio graph may already be closed.
        }
        bubbleTimer = window.setTimeout(
          scheduleBubble,
          1400 + Math.random() * 2200,
        );
      };
      bubbleTimer = window.setTimeout(scheduleBubble, 800);

      return () => {
        window.clearTimeout(bubbleTimer);
        try {
          noise.stop();
        } catch {
          // Already stopped.
        }
        void ctx.close();
      };
    } catch {
      void ctx.close();
      storageSet(STORAGE_KEYS.sound, "off");
      window.dispatchEvent(new Event(SOUND_EVENT));
    }
  }, [enabled]);

  const setEnabled = (value: boolean) => {
    storageSet(STORAGE_KEYS.sound, value ? "on" : "off");
    window.dispatchEvent(new Event(SOUND_EVENT));
  };

  return {
    soundOn: enabled,
    toggleSound: () => setEnabled(!enabled),
  };
}
