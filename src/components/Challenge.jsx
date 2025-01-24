import React, { useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const Challenge = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    duration: "",
  })

  const [isTitleExpanded, setIsTitleExpanded] = useState(false)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [isDateDurationExpanded, setIsDateDurationExpanded] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("authToken")
      await axios.post("http://localhost:3000/challenges", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert("Challenge created successfully!")
      setForm({ title: "", description: "", start_date: "", duration: "" })
    } catch (error) {
      console.error("Error creating challenge:", error)
      alert("Failed to create challenge. Try again.")
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row">
            {/* Motivational Quote Card */}
            <Card className="w-full md:w-3/12 mb-6 md:mb-0 md:mr-6 flex items-center bg-[#F2EFEF]">
              <CardContent className="p-4">
                <p className="text-xl md:text-2xl font-semibold font-poppin text-center">
                  Challenges are what make life interesting.
                </p>
              </CardContent>
            </Card>

            {/* Main Form Card */}
            <div className="w-full md:w-9/12">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold font-inter">Create Challenge</CardTitle>
                <p className="text-base text-gray-700 font-poppin">Set up a new productivity challenge</p>
              </CardHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <div
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsTitleExpanded(!isTitleExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Title</span>
                    {isTitleExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isTitleExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                          <p className="text-sm font-semibold text-gray-600 font-poppin">Name your challenge</p>
                          <p className="text-sm text-gray-500 italic">Eg. "30 Days of Coding"</p>
                        </div>
                        <Input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          placeholder="Enter challenge title"
                          className="w-full md:w-2/3"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <div
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Description</span>
                    {isDescriptionExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isDescriptionExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                          <p className="text-sm font-semibold text-gray-600 font-poppin">Describe your challenge</p>
                          <p className="text-sm text-gray-500 italic">Eg. "Provide details about the challenge"</p>
                        </div>
                        <Textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          placeholder="Describe your challenge"
                          className="w-full md:w-2/3 min-h-[100px]"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Date and Duration */}
                <div>
                  <div
                    className="flex justify-between items-center p-3 bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => setIsDateDurationExpanded(!isDateDurationExpanded)}
                  >
                    <span className="font-semibold text-gray-700 font-inter">Date and Duration</span>
                    {isDateDurationExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </div>
                  {isDateDurationExpanded && (
                    <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full md:w-1/3 mb-2 md:mb-0">
                          <p className="text-sm font-semibold text-gray-600 font-poppin">Set challenge timeline</p>
                          <p className="text-sm text-gray-500 italic">Choose start date and duration</p>
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <Input
                              type="date"
                              name="start_date"
                              value={form.start_date}
                              onChange={handleChange}
                              className="flex-grow"
                              required
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <Input
                              type="number"
                              name="duration"
                              value={form.duration}
                              onChange={handleChange}
                              placeholder="Duration in days"
                              className="flex-grow"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-[#8046F3] hover:bg-[#6A35D9] text-white font-inter">
                  Create Challenge
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Challenge

