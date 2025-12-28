import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoal } from '../hooks/useGoal';
import confetti from 'canvas-confetti';

const GoalCreatePage = () => {
  const navigate = useNavigate();
  const { createGoal, loading, error, success } = useGoal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [milestones, setMilestones] = useState(['', '', '']);

  const addMilestone = () => {
    if (milestones.length < 7) {
      setMilestones([...milestones, '']);
    }
  };

  const removeMilestone = (index) => {
    if (milestones.length > 3) {
      setMilestones(milestones.filter((_, i) => i !== index));
    }
  };

  const updateMilestone = (index, value) => {
    const updated = [...milestones];
    updated[index] = value;
    setMilestones(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedMilestones = milestones.map(m => m.trim()).filter(Boolean);

    if (trimmedMilestones.length < 3 || trimmedMilestones.length > 7) {
      alert('Please provide between 3 and 7 milestones');
      return;
    }

    const result = await createGoal(
      title.trim(),
      description.trim(),
      trimmedMilestones
    );

    if (result.success) {
      confetti({
        particleCount: 180,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#22d3ee'],
      });

      setTimeout(() => navigate('/dashboard'), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 mb-4">
            Define Your Focus
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            One clear goal. Broken down. Executed with intent.
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-violet-500/40 to-cyan-400/40 shadow-2xl">
          <div className="bg-white dark:bg-gray-900 rounded-3xl">
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Goal Title */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Goal title
                  </span>
                  <input
                    type="text"
                    placeholder="Master React in 30 days"
                    className="input input-bordered h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </span>
                  <textarea
                    rows="4"
                    placeholder="Why does this goal matter?"
                    className="textarea textarea-bordered text-base bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Milestones */}
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-500 block mb-4">
                    Milestones ({milestones.length}/7)
                  </span>

                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition"
                      >
                        <span className="text-sm font-bold text-indigo-500 w-5 text-center">
                          {index + 1}
                        </span>

                        <input
                          type="text"
                          placeholder={`Milestone ${index + 1}`}
                          className="input input-ghost h-11 text-base flex-1 focus:outline-none"
                          value={milestone}
                          onChange={(e) =>
                            updateMilestone(index, e.target.value)
                          }
                          required
                        />

                        {milestones.length > 3 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-red-500"
                            onClick={() => removeMilestone(index)}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    {milestones.length < 7 && (
                      <button
                        type="button"
                        className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white border-none"
                        onClick={addMilestone}
                      >
                        + Add milestone
                      </button>
                    )}
                    <span className="text-xs text-gray-500 italic">
                      3–7 milestones recommended
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn w-full h-14 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 hover:brightness-110 border-none shadow-xl"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    'Commit to This Goal'
                  )}
                </button>
              </form>

              {success && (
                <div className="alert alert-success mt-8">
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="alert alert-error mt-8">
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCreatePage;
