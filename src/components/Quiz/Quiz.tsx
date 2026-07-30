import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { quizQuestions } from '@/utils/quizData';
import Confetti from '@/components/Confetti/Confetti';

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const question = quizQuestions[current];
  const isLastQuestion = current === quizQuestions.length - 1;

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const pct = (score / quizQuestions.length) * 100;
    if (pct === 100) return { msg: "Perfect Score! You know Rola so well! 🏆", emoji: '👑' };
    if (pct >= 80) return { msg: "Amazing! You really know Rola! 🌟", emoji: '⭐' };
    if (pct >= 60) return { msg: "Great job! Keep getting to know Rola! 💕", emoji: '💖' };
    return { msg: "Keep learning about the amazing Rola! 🌸", emoji: '🌸' };
  };

  return (
    <section id="quiz" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blush to-white" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/20 border border-accent/30 mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>🎮</span>
            <span className="text-sm font-semibold text-amber-600">Fun Quiz</span>
          </motion.div>
          <h2 className="section-title gradient-text">How Well Do You Know Rola?</h2>
          <p className="section-subtitle">Take this fun quiz to find out! 🌸</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${current}`}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500 font-medium">
                    Question {current + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-sm font-bold text-primary">
                    Score: {score} 💕
                  </span>
                </div>
                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    animate={{ width: `${((current) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="glass-card p-8 mb-6">
                <div className="text-center mb-8">
                  <motion.span
                    className="text-5xl block mb-4"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {question.emoji}
                  </motion.span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-800">
                    {question.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === question.correctIndex;
                    const showFeedback = selected !== null;

                    return (
                      <motion.button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={selected !== null}
                        className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 border-2 ${
                          showFeedback
                            ? isCorrect
                              ? 'bg-green-50 border-green-400 text-green-700'
                              : isSelected
                              ? 'bg-red-50 border-red-400 text-red-600'
                              : 'bg-gray-50 border-gray-200 text-gray-400'
                            : 'bg-white/60 border-white/50 text-gray-700 hover:border-primary hover:bg-pink-50 hover:text-primary cursor-pointer'
                        }`}
                        whileHover={selected === null ? { scale: 1.02, x: 5 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                              showFeedback
                                ? isCorrect
                                  ? 'bg-green-400 text-white'
                                  : isSelected
                                  ? 'bg-red-400 text-white'
                                  : 'bg-gray-200 text-gray-500'
                                : 'bg-pink-100 text-primary'
                            }`}
                          >
                            {showFeedback
                              ? isCorrect ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + i)
                              : String.fromCharCode(65 + i)}
                          </span>
                          {option}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {selected !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
                    >
                      <p className="text-sm text-gray-700 italic">💡 {question.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Next button */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <motion.button
                      onClick={handleNext}
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLastQuestion ? '🎉 See Results' : 'Next Question →'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="glass-card p-10">
                <motion.span
                  className="text-7xl block mb-6"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {getScoreMessage().emoji}
                </motion.span>

                <h3 className="font-display text-3xl font-bold gradient-text mb-3">
                  Quiz Complete!
                </h3>

                <div className="text-6xl font-black text-gray-800 mb-2">
                  {score}/{quizQuestions.length}
                </div>

                <p className="text-gray-500 mb-6">{getScoreMessage().msg}</p>

                {/* Answer summary */}
                <div className="flex justify-center gap-2 mb-8">
                  {answers.map((correct, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: 'spring' }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        correct ? 'bg-green-400' : 'bg-red-400'
                      }`}
                    >
                      {correct ? '✓' : '✗'}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    onClick={handleRestart}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🔄 Try Again
                  </motion.button>
                  <motion.button
                    onClick={() => document.getElementById('cake')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-ghost"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎂 See the Cake
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Confetti trigger={showConfetti} />
      </div>
    </section>
  );
};

export default Quiz;
