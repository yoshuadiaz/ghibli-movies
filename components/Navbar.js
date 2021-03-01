import React from "react"
import Image from "next/image"
import navbarStyles from "../styles/Navbar.module.css"
import layoutStyles from "../styles/Layout.module.css"
import Link from "next/link"
import { Search } from "semantic-ui-react"

import escapeRegExp from "lodash/escaperegexp"
import filter from "lodash/filter"

export const initialState = {
  loading: false,
  results: null,
  value: "",
}

export const ACTIONS = {
  CLEAN_QUERY: "CLEAN_QUERY",
  START_SEARCH: "START_SEARCH",
  FINISH_SEARCH: "FINISH_SEARCH",
  UPDATE_SELECTION: "UPDATE_SELECTION",
}

export function searchReducer(state, action) {
  switch (action.type) {
    case ACTIONS.CLEAN_QUERY:
      return { ...initialState, result: null }
    case ACTIONS.START_SEARCH:
      return { ...state, loading: true, value: action.payload }
    case ACTIONS.FINISH_SEARCH:
      return { ...state, loading: false, results: action.payload }
    case ACTIONS.UPDATE_SELECTION:
      return { ...state, value: action.payload }

    default:
      throw new Error()
  }
}

export const navbarHandleOnSelect = (router, id) => {
  router.push(`/${id}`)
}

export const navbarHandleOnSearch = (source, data, timer, dispatch) => {
  clearTimeout(timer)
  dispatch({ type: ACTIONS.START_SEARCH, payload: data.value })

  timer = setTimeout(() => {
    if (data.value.length === 0) {
      dispatch({ type: "CLEAN_QUERY" })
      return
    }

    const re = new RegExp(escapeRegExp(data.value), "i")
    const isMatch = (result) => re.test(result.title)

    dispatch({
      type: "FINISH_SEARCH",
      payload: filter(source, isMatch),
    })
  }, 300)
}

const Navbar = ({ handleOnSelect, handleOnSearch, results }) => {
  return (
    <header className={`${layoutStyles.wrap} ${navbarStyles.wrap}`}>
      <div className={`${layoutStyles.container} ${navbarStyles.content}`}>
        <Link href="/">
          <h1 className={navbarStyles.brand}>
            Studio Ghibli Movies
            <Image
              src={"/logo.svg"}
              width={200}
              height={70}
              alt="Studio Ghibli Movies"
            />
          </h1>
        </Link>

        <section className={layoutStyles.container}>
          <Search
            onResultSelect={handleOnSelect}
            onSearchChange={handleOnSearch}
            results={results}
          />
        </section>
      </div>
    </header>
  )
}

export default Navbar
