import React, { Fragment } from "react";
import Analytics from "./landing/Analytics";
import Cards from "./landing/Cards";
import Hero from "./landing/Hero";
import Newsletter from "./landing/Newsletter";

const Landing = () => {

    return (
        <Fragment>
            <Hero />
            <Analytics />
            <Newsletter />
            <Cards />
        </Fragment>
    )
}

export default Landing