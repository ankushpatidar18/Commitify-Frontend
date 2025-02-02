import { useEffect, useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { parseISO, format, parse, startOfWeek, getDay } from "date-fns"
import enUS from "date-fns/locale/en-US"
import useCommitmentStore from "../stores/useCommitmentStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronUp, CheckCircle, XCircle, CalendarIcon } from "lucide-react"
import useUserStore from "../stores/useUserStore"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const CommitmentList = () => {
  const { commitments, fetchCommitments, updateCommitmentStatus } = useCommitmentStore()
  const [openCommitment, setOpenCommitment] = useState(null)

  useEffect(() => {
    fetchCommitments()
  }, [fetchCommitments])

  const getCommitmentColor = (index) => {
    const colors = [
      "from-purple-100 to-purple-200",
      "from-blue-100 to-blue-200",
      "from-green-100 to-green-200",
      "from-yellow-100 to-yellow-200",
      "from-pink-100 to-pink-200",
    ]
    return colors[index % colors.length]
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "failed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 mr-1" />
      case "failed":
        return <XCircle className="w-4 h-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center ">Joined Commitments</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="grid gap-4">
              {commitments.length === 0 ? (
                <p className="text-center text-gray-500 col-span-2">Loading commitments...</p>
              ) : (
                commitments.map((commitment, index) => {
                  const events = commitment.dailyStatuses.map((status) => ({
                    title: status.status,
                    start: parseISO(status.date),
                    end: parseISO(status.date),
                    status: status.status,
                  }))

                  return (
                    <div
                      key={commitment._id}
                      className={`bg-gradient-to-br ${getCommitmentColor(index)} rounded-lg shadow-md overflow-hidden`}
                    >
                      <div
                        className="p-4 cursor-pointer"
                        onClick={() => setOpenCommitment(openCommitment === commitment._id ? null : commitment._id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CalendarIcon className="w-6 h-6 text-[#8046F3]" />
                            <h2 className="text-xl font-semibold text-[#8046F3]">{commitment.name}</h2>
                          </div>
                          {openCommitment === commitment._id ? (
                            <ChevronUp className="w-6 h-6 text-[#8046F3]" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-[#8046F3]" />
                          )}
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Last update:{" "}
                          {format(
                            parseISO(commitment.dailyStatuses[commitment.dailyStatuses.length - 1].date),
                            "MMM dd, yyyy",
                          )}
                        </div>
                      </div>
                      {openCommitment === commitment._id && (
                        <div className="bg-white p-4">
                          <Calendar
                            localizer={localizer}
                            events={events}
                            defaultView="agenda"
                            views={["agenda"]}
                            style={{ height: 300 }}
                            components={{
                              event: ({ event }) => (
                                <div className="flex items-center justify-between py-2 border-b last:border-b-0">
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">{format(event.start, "MMM dd")}</span>
                                    <span className={`flex items-center ${getStatusColor(event.status)}`}>
                                      {getStatusIcon(event.status)}
                                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                    </span>
                                  </div>
                                  <div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="mr-2"
                                      onClick={async () => {
                                        await updateCommitmentStatus(commitment._id, event.start, "completed")
                                        await useUserStore.getState().refreshUserData()
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      Completed
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={async () => {
                                        await updateCommitmentStatus(commitment._id, event.start, "failed")
                                        await useUserStore.getState().refreshUserData()
                                      }}
                                    >
                                      <XCircle className="w-4 h-4 mr-1" />
                                      Missed
                                    </Button>
                                  </div>
                                </div>
                              ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default CommitmentList

