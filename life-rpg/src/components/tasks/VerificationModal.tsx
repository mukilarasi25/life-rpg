import React, { useState } from 'react';
import { Task, VerificationQuestion, TaskVerification } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useGame } from '../../context/GameContext';
import { CATEGORY_VERIFICATION_PROMPTS, evaluateVerification } from '../../utils/verification';
import { 
  ShieldCheck, Upload, Watch, CheckCircle2, AlertCircle, 
  HelpCircle, X, Sparkles, FileText
} from 'lucide-react';

interface VerificationModalProps {
  task: Task;
  onClose: () => void;
  onVerified: (verification: TaskVerification) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ task, onClose, onVerified }) => {
  const { t, language } = useLanguage();
  const { wearable, syncWearableData } = useGame();

  const template = CATEGORY_VERIFICATION_PROMPTS[task.categoryId] || CATEGORY_VERIFICATION_PROMPTS['default'];

  const [hasUploadedEvidence, setHasUploadedEvidence] = useState(false);
  const [evidenceFileName, setEvidenceFileName] = useState('');
  const [wearableSynced, setWearableSynced] = useState(false);

  const [answers, setAnswers] = useState<string[]>(() =>
    template.questions.map(() => '')
  );

  const [evaluationResult, setEvaluationResult] = useState<ReturnType<typeof evaluateVerification> | null>(null);

  const handleSimulateUpload = () => {
    setHasUploadedEvidence(true);
    setEvidenceFileName(`${task.categoryId}_evidence_${Date.now().toString().slice(-4)}.png`);
  };

  const handleSyncWearable = () => {
    syncWearableData();
    setWearableSynced(true);
  };

  const handleEvaluate = () => {
    const formattedQuestions: VerificationQuestion[] = template.questions.map((q, idx) => ({
      question: q.question,
      questionTa: q.questionTa,
      answer: answers[idx] || '',
    }));

    const result = evaluateVerification(
      task.categoryId,
      hasUploadedEvidence,
      wearableSynced && task.categoryId === 'fitness',
      formattedQuestions
    );

    setEvaluationResult(result);
  };

  const handleConfirmCompletion = () => {
    if (!evaluationResult) return;

    const formattedQuestions: VerificationQuestion[] = template.questions.map((q, idx) => ({
      question: q.question,
      questionTa: q.questionTa,
      answer: answers[idx] || '',
    }));

    const verification: TaskVerification = {
      id: `verif_${Date.now()}`,
      taskId: task.id,
      status: evaluationResult.status,
      confidenceScore: evaluationResult.confidenceScore,
      questions: formattedQuestions,
      rationale: evaluationResult.rationale,
      rationaleTa: evaluationResult.rationaleTa,
      verifiedAt: new Date().toISOString(),
      verifiedXpEarned: Math.max(1, Math.round(task.xpValue * evaluationResult.xpMultiplier)),
    };

    onVerified(verification);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              {t('verifyTitle')}
            </h3>
            <p className="text-xs text-slate-400">
              Quest: <span className="text-amber-400 font-semibold">{task.title}</span> (+{task.xpValue} XP base)
            </p>
          </div>
        </div>

        {!evaluationResult ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              {t('verifySubtitle')}
            </p>

            {/* Evidence Upload Section */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-cyan-400" />
                {t('uploadProofLabel')}
              </label>

              {hasUploadedEvidence ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {evidenceFileName}
                  </span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                  </span>
                </div>
              ) : (
                <div 
                  onClick={handleSimulateUpload}
                  className="border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-4 text-center cursor-pointer transition-all bg-slate-900/40"
                >
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-300 font-medium">
                    Click to attach study notes, screenshot, or code output
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG, PDF, JPG, MD</p>
                </div>
              )}
            </div>

            {/* Wearable Fitness Tracker Integration for Fitness tasks */}
            {task.categoryId === 'fitness' && (
              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Watch className="w-4 h-4 text-emerald-400" />
                    Fitness Tracker Sync (Garmin / Apple / WearOS)
                  </span>
                  {wearableSynced && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      Synced
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Device reports <strong className="text-emerald-300">{wearable.todaySteps.toLocaleString()} steps</strong> and <strong className="text-emerald-300">{wearable.workoutDurationMinutes} mins</strong> active workout.
                </p>
                <button
                  type="button"
                  onClick={handleSyncWearable}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Watch className="w-3.5 h-3.5" />
                  {wearableSynced ? 'Sync Again' : t('syncFitnessBtn')}
                </button>
              </div>
            )}

            {/* Dynamic AI Questions tailored to category */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                {t('aiQuestionsTitle')}
              </h4>

              {template.questions.map((q, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-xs text-slate-300 font-medium block">
                    {idx + 1}. {language === 'ta' ? q.questionTa : q.question}
                  </label>
                  <textarea
                    rows={2}
                    value={answers[idx]}
                    onChange={(e) => {
                      const updated = [...answers];
                      updated[idx] = e.target.value;
                      setAnswers(updated);
                    }}
                    placeholder={language === 'ta' ? q.placeholderTa : q.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Evaluate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleEvaluate}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {t('submitVerificationBtn')}
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Evaluation Result & XP Confirmation */
          <div className="space-y-4 text-center py-2 animate-fadeIn">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 text-cyan-300">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white capitalize">
                Verification Result: {evaluationResult.status.replace('_', ' ')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('confidenceScore')}: <strong className="text-cyan-400 font-mono">{evaluationResult.confidenceScore}%</strong>
              </p>
            </div>

            {/* Status card */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Awarded XP:</span>
                <span className="text-amber-400 font-black font-mono text-sm">
                  +{Math.max(1, Math.round(task.xpValue * evaluationResult.xpMultiplier))} XP 
                  ({Math.round(evaluationResult.xpMultiplier * 100)}% of {task.xpValue} XP)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Evaluation Rationale:</span>
              </div>
              <p className="text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                {language === 'ta' ? evaluationResult.rationaleTa : evaluationResult.rationale}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEvaluationResult(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Edit Proof
              </button>
              <button
                type="button"
                onClick={handleConfirmCompletion}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
              >
                Claim XP & Finish Quest
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
