import React from "react";

const CountryInfo = (props) => {
    return (
        <div className='card'>
            <div className='card-header'>{props.args.country}, {props.args.continent}</div>
            <div className='card-body hidden'>
                <div>active: {props.args.active}</div>
                <div>cases: {props.args.cases}</div>
                <div>casesPerOneMillion: {props.args.casesPerOneMillion}</div>
                <div>critical: {props.args.critical}</div>
                <div>deaths: {props.args.deaths}</div>
                <div>deathsPerOneMillion: {props.args.deathsPerOneMillion}</div>
                <div>recovered: {props.args.recovered}</div>
                <hr/>
                <div>tests: {props.args.tests}</div>
                <div>testsPerOneMillion: {props.args.testsPerOneMillion}</div>
                <hr/>
                <div>todayCases: {props.args.todayCases}</div>
                <div>todayDeaths: {props.args.todayDeaths}</div>
                <div>updated: {props.args.updated}</div>
            </div>
        </div>

    )
}

export default CountryInfo