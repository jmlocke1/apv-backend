function quitaBlancosArray( miArray ) {
    const limpio = miArray
        .map( item => typeof item === "string" ? item.trim() : item )
    
    return limpio;
}

export {
    quitaBlancosArray
}