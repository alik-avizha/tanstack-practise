import { createFileRoute } from "@tanstack/react-router";

const LAST_STEP = 3;

type StepsSearchParams = { username: string; step?: number };

export const Route = createFileRoute("/steps")({
  component: RouteComponent,
  validateSearch: (search) => {
    const step = Number(search.step);

    return {
      username: search.username ? String(search.username) : "Guest",
      step: isNaN(step) ? undefined : Math.max(Math.min(LAST_STEP, step), 0),
    };
  },
  staticData: {
    breadcrumb: ({ search }: { search: StepsSearchParams }) =>
      search.step ? ["Steps", `${search.step}`] : "Steps",
  },
});

function RouteComponent() {
  const { step = 0, username } = Route.useSearch();
  const navigate = Route.useNavigate();

  const move = (step: number) =>
    navigate({
      search: (prev) => ({ ...prev, step }),
    });
  const prev = () => move(step - 1);
  const next = () => move(step + 1);

  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">
            Multi-Step Process
          </h1>
          <p className="text-gray-400">
            Hello <span className="text-neon-cyan font-semibold">{username}</span>! Complete each step to continue.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-neon-cyan font-mono">Step {step + 1} of {LAST_STEP + 1}</span>
          </div>
          <div className="h-3 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((step + 1) / (LAST_STEP + 1)) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-neon-cyan" : "bg-dark-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="neon-card p-8 mb-8 min-h-[300px]">
          {step === 0 && <Step0 />}
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={prev}
            disabled={step <= 0}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              step <= 0
                ? "bg-dark-700 text-gray-500 cursor-not-allowed"
                : "bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={next}
            disabled={step >= LAST_STEP}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
              step >= LAST_STEP
                ? "bg-neon-green/20 text-neon-green cursor-not-allowed"
                : "bg-gradient-to-r from-neon-cyan to-neon-pink text-dark-900 hover:opacity-90"
            }`}
          >
            {step >= LAST_STEP ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Complete!
              </>
            ) : (
              <>
                Next
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const Step0 = () => {
  return (
    <div className="text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-cyan/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Welcome, Trainer!</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        This is the first step of your journey. Let's get started by setting up your profile.
      </p>
    </div>
  );
};

const Step1 = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Starter</h3>
        <p className="text-gray-400">Select your first Pokemon companion</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {["Bulbasaur", "Charmander", "Squirtle"].map((pokemon, i) => (
          <button
            key={pokemon}
            className="p-4 rounded-xl bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 text-center group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {["🌱", "🔥", "💧"][i]}
            </div>
            <p className="text-sm text-gray-300">{pokemon}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

const Step2 = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Almost There!</h3>
        <p className="text-gray-400">Review your choices before completing</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50 border border-dark-500">
          <span className="text-gray-400">Profile</span>
          <span className="text-neon-cyan">Complete ✓</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50 border border-dark-500">
          <span className="text-gray-400">Starter Pokemon</span>
          <span className="text-neon-cyan">Selected ✓</span>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg bg-dark-800/50 border border-dark-500">
          <span className="text-gray-400">Final Confirmation</span>
          <span className="text-gray-500">Pending</span>
        </div>
      </div>
    </div>
  );
};

const Step3 = () => {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-neon-green/20 flex items-center justify-center animate-pulse">
        <svg className="w-12 h-12 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">Congratulations!</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-8">
        You've completed all the steps. Your adventure is about to begin!
      </p>
      <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-neon-green to-neon-cyan text-dark-900 font-semibold hover:opacity-90 transition-opacity duration-300">
        Start Your Adventure
      </button>
    </div>
  );
};
