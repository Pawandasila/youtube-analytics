import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import FeatureList from './_components/FeatureList'
import CurrentPlan from './_components/CurrentPlan'

function Dashboard() {
    return (
        <div className="space-y-6">
            <WelcomeBanner />
            {/* <CurrentPlan /> */}
            <FeatureList />
        </div>
    )
}

export default Dashboard