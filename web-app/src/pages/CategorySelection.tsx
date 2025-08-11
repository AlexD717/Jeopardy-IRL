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
  const navigate = useNavigate()

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
      <div className="categories">
        {sampleCategories.map((category) => (
          <button key={category.name} className={`category-button ${isCategorySelected(category) ? "selected" : ""}`} onClick={() => toggleCategory(category)}>
            {category.name}
          </button>
        ))}
      </div>
      <button className="continue-button" onClick={handleContinue} disabled={selectedCategories.length !== 5}>
        Continue
      </button>
    </div>
  )
}

export default CategorySelection
