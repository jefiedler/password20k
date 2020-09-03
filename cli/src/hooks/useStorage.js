import { useState } from "react";



function useStorage(key, initalValue, storage = localStorage){
    const [value, setValue] = useState(()=> {
        try{
            const value = localStorage.setItem(key);
            return value ? JSON.parse(value) : initalValue;
        } catch (error) {
            console.log(error);
            return initalValue;
        }
    });

    function handleChange(newValue) {
        storage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }

    return [value, handleChange];
}

export default useStorage;