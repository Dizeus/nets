import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Bio from "../Components/Home/Bio";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Bio">
                <Bio/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews