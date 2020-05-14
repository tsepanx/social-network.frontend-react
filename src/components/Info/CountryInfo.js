import React from "react";

const CountryInfo = ({args}) => {

    if (args.error) {
        return (<div>{args.error}</div>)
    }

    return (
        <div>
            <div>{args.country}, {args.continent}</div>
            <div className='hidden info-content'>
                <div>active: {args.active}</div>
                <div>cases: {args.cases}</div>
                <div>casesPerOneMillion: {args.casesPerOneMillion}</div>
                <div>critical: {args.critical}</div>
                <div>deaths: {args.deaths}</div>
                <div>deathsPerOneMillion: {args.deathsPerOneMillion}</div>
                <div>recovered: {args.recovered}</div>
                <hr/>
                <div>tests: {args.tests}</div>
                <div>testsPerOneMillion: {args.testsPerOneMillion}</div>
                <hr/>
                <div>todayCases: {args.todayCases}</div>
                <div>todayDeaths: {args.todayDeaths}</div>
                <div>updated: {args.updated}</div>
            </div>
        </div>

    )
}

export default CountryInfo