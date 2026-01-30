/**
 * useRetrieveData.js - this file contains a custom React hook that retrieves data based 
 * on the type selected (movies, series, popular) and returns an array of data rows for 
 * selected type.
 */

/*
This following block of code imports necessary react and redux hooks and data configuration objects.
*/
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/**
 * Custom React hook that retrives data based on type selected: movies, series, popular
 * @param {string} type - Type of data to retrieve: "movies", "series", "popular"
 * @returns {Array} - Array of data with rows containing id, title, genre, selector, isLarge variables
 */
export const useRetrieveData = (type) => {

    // initialize dispatch as global state dispatcher from redux
    const dispatch = useDispatch()

    //useState variable to hold data rows
    const [data, setData] = useState(null)

    /* 
        This block of code represents a useEffect hook that runs when the type or dispatch changes.
        It fetches data based on the type provided and updates the data state.
    */
    useEffect(() => {

        let selectedConfigArray = null;
        
        switch (type) {
            case "movies":
                selectedConfigArray = fetchMovieDataConfig;
                break;
            case "series":
                selectedConfigArray = fetchSeriesDataConfig;
                break;
            case "popular":
                selectedConfigArray = fetchPopularDataConfig;
                break;
            default:
                break;
        }

        // boolean variable to indicate page replacement or appending
        let isPage = true;

        /* 
        This block of code maps through the selected configuration array, dispatches the thunk action
        to fetch data for each row and constructs an array of row data objects.
        */
        const rowsData = selectedConfigArray.map(el => {
            
            // dispatch the thunk action to fetch data
            dispatch(el.thunk(el.url, isPage))

            // return row data object
            return {
                id: el.id,
                title: el.title,
                genre: el.genre,
                selector: el.selector,
                isLarge: el.isLarge
            }
        })

        setData(rowsData) // update data state with rowsData array

    }, [type, dispatch]) // end of useEffect

    // return data state
    return data
}
