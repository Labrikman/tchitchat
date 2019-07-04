import React from 'react';

const Loader = ({ loading, render }) => {
    if(loading)
        return <h2>Chargement...</h2>
    return render;
}

export default Loader;