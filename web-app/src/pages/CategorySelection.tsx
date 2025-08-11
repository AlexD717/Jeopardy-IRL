import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CategorySelection.css"
import { ESPCommunicator } from "../systems/ESPCommunicator"
import { PageCommunicator } from "../systems/PageCommunicator"
import { sampleCategories } from "../systems/Data"
import type { Category } from "../types"
import { toast } from "react-toastify"

const CategorySelection: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [customCategories, setCustomCategories] = useState<Category[]>([])
  const navigate = useNavigate()

  const validateQuestion = (question: any): boolean => {
    return (
      typeof question.value === "number" &&
      typeof question.question === "string" &&
      typeof question.answer === "string" &&
      question.value > 0 &&
      question.question.trim() !== "" &&
      question.answer.trim() !== ""
    )
  }

  const validateCategory = (category: any): boolean => {
    return (
      typeof category.name === "string" &&
      category.name.trim() !== "" &&
      Array.isArray(category.questions) &&
      category.questions.length === 5 &&
      category.questions.every(validateQuestion) &&
      !customCategories.some((cat) => cat.name === category.name)
    )
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/json") {
      toast.error("Please upload a JSON file", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string)

        if (!Array.isArray(jsonData)) {
          toast.error("JSON file must contain an array of categories", {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          })
          return
        }

        const validCategories: Category[] = []

        for (const category of jsonData) {
          if (validateCategory(category)) {
            const processedCategory: Category = {
              name: category.name,
              questions: category.questions.map((question: any) => ({
                id: crypto.randomUUID(),
                value: question.value,
                question: question.question,
                answer: question.answer,
                asked: false,
              })),
            }
            validCategories.push(processedCategory)
          } else {
            toast.error(`Invalid category format: ${category.name || "Unknown"}`, {
              position: "bottom-right",
              autoClose: 5000,
              theme: "dark",
            })
          }
        }

        if (validCategories.length > 0) {
          setCustomCategories([...customCategories, ...validCategories])
          toast.success(`Successfully added ${validCategories.length} custom categories!`, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "dark",
          })
        }
      } catch (error) {
        toast.error("Invalid JSON file format", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "dark",
        })
      }
    }
    reader.readAsText(file)
  }

  const toggleCategory = (category: Category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
    } else if (selectedCategories.length < 5) {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const isCategorySelected = (category: Category) => selectedCategories.includes(category)

  const handleContinue = () => {
    if (selectedCategories.length === 5) {
      console.log("Selected Categories:", selectedCategories)
      ESPCommunicator.getInstance().sendMessage("Game Start")
      PageCommunicator.OpenGamePage(selectedCategories)
      navigate("/gamehost", { state: { categories: selectedCategories } })
    } else {
      toast.error("Make sure to select exactly 5 categories", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      })
    }
  }

  return (
    <div className="category-selection">
      <h1>Select 5 Categories</h1>

      <div className="categories-container">
        <h2>Sample Categories</h2>
        <div className="categories">
          {sampleCategories.map((category) => (
            <button key={category.name} className={`category-button ${isCategorySelected(category) ? "selected" : ""}`} onClick={() => toggleCategory(category)}>
              {category.name}
            </button>
          ))}
        </div>
        <h2>Custom Categories</h2>
        <div className="categories">
          {customCategories.map((category) => (
            <button key={category.name} className={`category-button ${isCategorySelected(category) ? "selected" : ""}`} onClick={() => toggleCategory(category)}>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <hr></hr>
      <div className="upload-section">
        <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
        <label htmlFor="file-upload" className="upload-button">
          Upload Custom Categories (JSON)
        </label>
        <p style={{ fontSize: "16px", color: "#dededeff", marginTop: "5px" }}>
          Upload a JSON file with categories. Each category needs a "name" and exactly 5 "questions". Each question needs "value", "question", and "answer" fields.{" "}
          <a href="https://github.com/AlexD717/Jeopardy-IRL/tree/main/web-app/public/sample-categories.json" target="_blank">
            {" "}
            Example
          </a>
        </p>
      </div>

      <button className="continue-button" onClick={handleContinue} disabled={selectedCategories.length !== 5}>
        Continue
      </button>
    </div>
  )
}

export default CategorySelection
