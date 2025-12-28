import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoal } from '../hooks/useGoal';
import confetti from 'canvas-confetti';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { getActiveGoal, updateMilestone, getCompletedGoals, loading } = useGoal();

    const [activeGoal, setActiveGoal] = useState(null);
    const [completedGoals, setCompletedGoals] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const activeRes = await getActiveGoal();

            if (activeRes.success && activeRes.data) {
                setActiveGoal(activeRes.data);
            } else {
                navigate('/create-goal');
            }

            const completedRes = await getCompletedGoals();
            if (completedRes.success) {
                setCompletedGoals(completedRes.data);
            }
        };

        loadData();
    }, [navigate]);

    const handleMarkDone = async (milestoneIndex) => {
        if (!activeGoal) return;

        const result = await updateMilestone(activeGoal._id, milestoneIndex);

        if (result.success) {
            const updatedGoal = result.data;
            setActiveGoal(updatedGoal);

            if (!updatedGoal.isActive) {
                confetti({
                    particleCount: 180,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#22d3ee', '#34d399'],
                });

                setTimeout(async () => {
                    setActiveGoal(null);
                    const refreshed = await getCompletedGoals();
                    if (refreshed.success) {
                        setCompletedGoals(refreshed.data);
                    }
                }, 1500);
            }
        }
    };

    const completedCount =
        activeGoal?.milestones?.filter(m => m.done).length || 0;

    const total = activeGoal?.milestones?.length || 0;
    const percent = total ? Math.round((completedCount / total) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 px-6 py-14">
            <div className="max-w-5xl mx-auto space-y-20">

                {/* Header */}
                <header className="text-center space-y-4">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                        Welcome Back
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Small steps. Consistent progress.
                    </p>
                </header>

                {loading && (
                    <div className="flex justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Active Goal */}
                {activeGoal && (
                    <section className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 rounded-[2.5rem] p-10 shadow-xl border border-white/40">

                        {/* Goal Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">
                                    {activeGoal.title}
                                </h2>
                                {activeGoal.description && (
                                    <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                                        {activeGoal.description}
                                    </p>
                                )}
                            </div>

                            {/* Circular Progress */}
                            <div className="relative w-32 h-32">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="10"
                                        fill="transparent"
                                        className="text-gray-200 dark:text-gray-700"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="56"
                                        stroke="currentColor"
                                        strokeWidth="10"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 56}
                                        strokeDashoffset={
                                            2 * Math.PI * 56 * (1 - percent / 100)
                                        }
                                        className="text-indigo-600 transition-all duration-700"
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl font-bold">
                                        {percent}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="space-y-6">
                            {activeGoal.milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-5 p-4 rounded-2xl transition
                                        ${milestone.done
                                            ? 'bg-green-50 dark:bg-green-900/20'
                                            : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                                            ${milestone.done
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-600'}`}
                                    >
                                        {milestone.done ? '✓' : index + 1}
                                    </div>

                                    <div className="flex-1">
                                        <p className={`text-lg ${milestone.done ? 'line-through text-gray-500' : ''}`}>
                                            {milestone.text}
                                        </p>
                                    </div>

                                    {!milestone.done && (
                                        <button
                                            onClick={() => handleMarkDone(index)}
                                            disabled={loading}
                                            className="btn btn-sm btn-outline rounded-full hover:bg-indigo-600 hover:border-indigo-600 hover:text-white"
                                        >
                                            Done
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Completed Goals */}
                {completedGoals.length > 0 && (
                    <section className="space-y-8">
                        <h3 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-300">
                            Achievements
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4">
                            {completedGoals.map(goal => (
                                <div
                                    key={goal._id}
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md text-sm font-medium"
                                >
                                    {goal.title}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
