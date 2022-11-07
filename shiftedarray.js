const shifted_array = (arr, p , d) => {
    const left__part = arr.slice(0,p);
    const right__part = arr.slice(p);
    
    if(d === 0){
        return [...right__part, ...left__part];
    } else{
        const modifed = [...right__part,...left__part];
         modifed.shift();
         return [...modifed, arr[p]];
    }
};
console.log(shifted_array([2,3,4,5,6,7], 3, 0));