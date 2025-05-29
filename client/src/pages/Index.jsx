import React from 'react'
import { observer } from 'mobx-react-lite'
import TrackCarousel from '../components/carousels/TracksCarousel'

function Index() {
    return (
        <div>
            <TrackCarousel limit={5} title={'Popular Hits'} tags={'pop+electronic'} />
            <TrackCarousel limit={5} title={'Chill & Relax'} tags={'acoustic+chillout'} />
            <TrackCarousel limit={5} title={'Rock & Energy'} tags={'rock+guitar+indie'} />
            <TrackCarousel limit={5} title={'Soul & Funk'} tags={'soul+funk'} />
        </div>
    )
}

export default observer(Index)
