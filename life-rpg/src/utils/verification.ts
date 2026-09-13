import { VerificationStatus, VerificationQuestion } from '../types';

export interface CategoryQuestionTemplate {
  category: string;
  defaultProofType: string;
  questions: { question: string; questionTa: string; placeholder: string; placeholderTa: string }[];
}

export const CATEGORY_VERIFICATION_PROMPTS: Record<string, CategoryQuestionTemplate> = {
  coding: {
    category: 'coding',
    defaultProofType: 'code_or_screenshot',
    questions: [
      {
        question: 'What exact technical problem did this program or code snippet solve?',
        questionTa: 'இந்த நிரல் அல்லது குறியீடு தீர்க்கும் துல்லியமான தொழில்நுட்ப சிக்கல் என்ன?',
        placeholder: 'e.g. Implemented balanced BST search in O(log N) time...',
        placeholderTa: 'எ.கா: O(log N) நேரத்தில் சமநிலைப்படுத்தப்பட்ட BST தேடலை செயல்படுத்தினேன்...',
      },
      {
        question: 'What key data structure, library, or programming concept was utilized?',
        questionTa: 'இதில் நீங்கள் பயன்படுத்திய முக்கிய தரவமைப்பு அல்லது முறை என்ன?',
        placeholder: 'e.g. Recursion, tree pointers, memory deallocation...',
        placeholderTa: 'எ.கா: சுழல்முறை, சுட்டிகள், நினைவக மேலாண்மை...',
      },
    ],
  },
  studies: {
    category: 'studies',
    defaultProofType: 'notes_or_certificate',
    questions: [
      {
        question: 'What specific academic topic or chapter did you study?',
        questionTa: 'நீங்கள் படித்த குறிப்பிட்ட பாடம் அல்லது தலைப்பு என்ன?',
        placeholder: 'e.g. Operating Systems Paging and Virtual Memory...',
        placeholderTa: 'எ.கா: இயக்க முறைமை மெய்நிகர் நினைவகம்...',
      },
      {
        question: 'Explain one major concept or formula you mastered during this session.',
        questionTa: 'இந்த அமர்வில் நீங்கள் கற்ற ஒரு முக்கிய கோட்பாட்டை விளக்குங்கள்.',
        placeholder: 'e.g. Page table lookups and how TLB reduces cache misses...',
        placeholderTa: 'எ.கா: பக்க அட்டவணை தேடல் மற்றும் கேச் நினைவகம்...',
      },
    ],
  },
  fitness: {
    category: 'fitness',
    defaultProofType: 'device_or_photo',
    questions: [
      {
        question: 'What physical activity, sets, or distance was performed?',
        questionTa: 'நீங்கள் செய்த உடற்பயிற்சி, சுற்றுகள் அல்லது தூரம் என்ன?',
        placeholder: 'e.g. 5.2 km outdoor run / 4 sets barbell squats...',
        placeholderTa: 'எ.கா: 5.2 கி.மீ ஓட்டம் அல்லது 4 சுற்றுகள் உடற்பயிற்சி...',
      },
      {
        question: 'What was your average perceived effort or duration?',
        questionTa: 'உங்கள் உடற்பயிற்சி நேரம் மற்றும் சிரம அளவு என்ன?',
        placeholder: 'e.g. 45 minutes, moderate-to-high intensity...',
        placeholderTa: 'எ.கா: 45 நிமிடங்கள், மிதமான முதல் அதிக தீவிரம்...',
      },
    ],
  },
  default: {
    category: 'general',
    defaultProofType: 'reflection',
    questions: [
      {
        question: 'Summarize the core outcome or deliverable produced.',
        questionTa: 'இந்த பணியில் உருவான முக்கிய பலன் அல்லது முடிவை சுருக்கமாகக் கூறுங்கள்.',
        placeholder: 'e.g. Completed milestone on time...',
        placeholderTa: 'எ.கா: திட்டமிட்டபடி மைல்கல்லை எட்டினேன்...',
      },
      {
        question: 'What reflection or key takeaway did you gain from this task?',
        questionTa: 'இந்தப் பணியிலிருந்து நீங்கள் உணர்ந்த முக்கிய அனுபவம் என்ன?',
        placeholder: 'e.g. Better time-blocking yielded uninterrupted focus...',
        placeholderTa: 'எ.கா: நேர மேலாண்மை நல்ல கவனத்தை தந்தது...',
      },
    ],
  },
};

export function evaluateVerification(
  category: string,
  hasEvidence: boolean,
  wearableVerified: boolean,
  questions: VerificationQuestion[]
): {
  status: VerificationStatus;
  confidenceScore: number;
  xpMultiplier: number;
  rationale: string;
  rationaleTa: string;
} {
  // Wearable automated hardware verification
  if (wearableVerified) {
    return {
      status: 'verified',
      confidenceScore: 100,
      xpMultiplier: 1.0,
      rationale: 'Hardware verified via connected fitness tracker sync (Steps / HR confirmed).',
      rationaleTa: 'இணைக்கப்பட்ட உடற்பயிற்சி கருவி மூலம் 100% உறுதி செய்யப்பட்டது.',
    };
  }

  const answeredQuestions = questions.filter((q) => q.answer.trim().length > 10).length;
  const detailedAnswers = questions.filter((q) => q.answer.trim().length > 30).length;

  // Layered confidence scoring
  if (hasEvidence && (answeredQuestions >= 2 || detailedAnswers >= 1)) {
    return {
      status: 'verified',
      confidenceScore: 95,
      xpMultiplier: 1.0,
      rationale: 'High confidence: Corroborated with submitted evidence and thorough conceptual explanation.',
      rationaleTa: 'முழு நம்பிக்கை: சமர்ப்பிக்கப்பட்ட சான்று மற்றும் துல்லியமான பதில்கள் மூலம் உறுதி செய்யப்பட்டது.',
    };
  }

  if (hasEvidence || answeredQuestions >= 1) {
    return {
      status: 'partially_verified',
      confidenceScore: 65,
      xpMultiplier: 0.5,
      rationale: 'Partially verified: Evidence or answers provided, awarded 50% XP.',
      rationaleTa: 'பகுதி சரிபார்ப்பு: ஓரளவு சான்றுகள் சமர்ப்பிக்கப்பட்டதால் 50% XP வழங்கப்படுகிறது.',
    };
  }

  // Self reported
  return {
    status: 'self_reported',
    confidenceScore: 35,
    xpMultiplier: 0.25,
    rationale: 'Self-reported completion without external proof. Awarded honest baseline 25% XP.',
    rationaleTa: 'சான்றுகள் இல்லாத சுய தகவல். நேர்மையான முயற்சியை மதித்து 25% XP வழங்கப்படுகிறது.',
  };
}
