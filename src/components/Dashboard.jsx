import { useEffect } from "react"
import { Link } from "react-router-dom"
import useUserStore from "../stores/useUserStore"
import useCommitmentStore from "@/stores/useCommitmentStore"
import useChallengeStore from "@/stores/useChallengeStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Trophy, Star, LogOut, PlusCircle, Award } from "lucide-react"

const Dashboard = () => {
  const { user, logout, rank } = useUserStore()
  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" })
  const { commitments, fetchCommitments, getPendingCount, getCompletedCount, getCancelledCount } = useCommitmentStore()
  const { challenges, fetchChallenges, getPendingcount, getCompletedcount, getCancelledcount } = useChallengeStore()

  useEffect(() => {
    fetchCommitments()
    fetchChallenges()
  }, [fetchCommitments, fetchChallenges])

  const commitmentSuccessRatio = (getCompletedCount() / (getCancelledCount() + getCompletedCount())) * 100 || 0
  const challengeSuccessRatio = (getCompletedcount() / (getCancelledcount() + getCompletedcount())) * 100 || 0

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Left Block */}
      <Card className="w-full md:w-3/12 bg-white shadow-xl">
        <CardContent className="p-6 flex flex-col space-y-6">
          {/* User Info */}
          <div className="flex items-center space-x-4">
          <img
            src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0Ha8_yqcioV7zGcUuEdYQN8cAC9BkJ3Kag&s' || user?.profilePicture}
            alt="User"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
              <p className="text-lg font-semibold">Happy {currentDay}!</p>
              <p className="text-sm text-gray-700">{user?.name}</p>
            </div>
          </div>

          {/* Commitments Overview */}
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <p className="text-center text-lg font-semibold">
                You have <span className="text-blue-600">{getPendingCount()}</span> commitments ongoing.
              </p>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <Card className="bg-green-50">
            <CardContent className="p-4">
              <p className="italic text-center text-green-700">
                "Success is the sum of small efforts, repeated day in and day out."
              </p>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex flex-col space-y-4">
            <Link to="/commitment">
              <Button className="w-full h-10 bg-blue-500 hover:bg-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Commitment
              </Button>
            </Link>
            <Link to="/challenges">
              <Button className="w-full h-10 bg-purple-500 hover:bg-purple-600">
                <Trophy className="mr-2 h-4 w-4" /> Join Challenges
              </Button>
            </Link>
            <Button onClick={logout} variant="destructive" className="w-full h-10">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Block */}
      <div className="w-full md:w-9/12 space-y-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user?.credits || 0}</div>
            </CardContent>
          </Card>
          <Link to="/leaderboard">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rank</CardTitle>
                <Trophy className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">#{rank}</div>
              </CardContent>
            </Card>
          </Link>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
            </CardContent>
          </Card>
        </div>

        {/* Commitments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Commitments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 space-y-2">
                <p>
                  Total Commitments: <span className="font-semibold">{commitments.length}</span>
                </p>
                <p>
                  Completed Commitments: <span className="font-semibold">{getCompletedCount()}</span>
                </p>
                <p>
                  Pending Commitments: <span className="font-semibold">{getPendingCount()}</span>
                </p>
                <p>
                  Failed Commitments: <span className="font-semibold">{getCancelledCount()}</span>
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-300"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-green-500"
                      strokeWidth="8"
                      strokeDasharray={58 * 2 * Math.PI}
                      strokeDashoffset={58 * 2 * Math.PI * ((100 - commitmentSuccessRatio) / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                    {commitmentSuccessRatio.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Challenges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 space-y-2">
                <p>
                  Total Challenges: <span className="font-semibold">{challenges.length}</span>
                </p>
                <p>
                  Completed Challenges: <span className="font-semibold">{getCompletedcount()}</span>
                </p>
                <p>
                  Pending Challenges: <span className="font-semibold">{getPendingcount()}</span>
                </p>
                <p>
                  Failed Challenges: <span className="font-semibold">{getCancelledcount()}</span>
                </p>
              </div>
              <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-300"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="8"
                      strokeDasharray={58 * 2 * Math.PI}
                      strokeDashoffset={58 * 2 * Math.PI * ((100 - challengeSuccessRatio) / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="58"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                    {challengeSuccessRatio.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

