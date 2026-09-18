import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const VideoShowcase: React.FC = () => {
  const { navigate } = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#f5f4ef]">
      <div className="kanva-container">
        <div className="relative rounded-3xl sm:rounded-[40px] overflow-hidden bg-[#1a1c18] text-white shadow-2xl border border-white/10 min-h-[460px] sm:min-h-[560px] flex items-end">
          
          {/* Background Atmospheric Video */}
          <video
            ref={videoRef}
            src="/assets/video/kanva-hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.78] contrast-[1.05]"
          />

          {/* Cinematic Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 pointer-events-none" />

          {/* Top Control Bar */}
          <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-8 flex items-center justify-between z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-mono tracking-widest uppercase text-[#dac5a7]">
              <Sparkles className="w-3.5 h-3.5 text-[#dac5a7]" />
              <span>THE CINEMATIC BOTANICAL REEL</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                title={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Bottom Content Narrative */}
          <div className="relative z-20 p-8 sm:p-14 max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-[-0.03em]">
              Crafted in Stillness, <br />
              <span className="italic text-[#dac5a7]">Delivered in Purity.</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-body leading-relaxed max-w-lg">
              Witness the alchemy of Vedic botanicals harvested under lunar rhythms in the Sahyadri mountains and bottled in pharmaceutical-grade amber glass.
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/about')}
                className="px-8 py-3.5 rounded-full bg-[#dac5a7] hover:bg-white text-[#1a1c18] font-mono text-xs uppercase tracking-widest font-bold transition-colors inline-flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <span>Read Our Heritage Story</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
