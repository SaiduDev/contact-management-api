export let registrationValidation =  (req, res, next) => {
    let { fullName, email, password} = req.body;

    if(!fullName || typeof fullName !== "string" || fullName.trim().length < 2){
        return res.status(404).json({message: "name must be more than 2 characters"});
    }
    
     if(!email || typeof email !== "string" || email.trim().length < 2 || !email.includes("@")){
        return res.status(404).json({message: "please enter a valid email"});
    }

     if(!password || typeof password !== "string" || password.trim().length < 8){
        return res.status(404).json({message: "password must be more than 8 characters"});
    }

    next();

}

export let loginValidation = (req, res, next) => {
    try {
        let {email, password} = req.body;

        if(!email || typeof email !== "string" || !email.includes("@")){
            return res.status(404).json({message: "please enter a valid email address"});
        }

        if(!password || typeof password !== "string" || password.trim().length < 8){
            return res.status(404).json({message: "password must be at least 8 characters"});
        }


        next();

    } catch (error) {
        res.status(500).json({message: "login validation failed"})
    }
}

export let updateProfileValidation = (req, res, next)=>{
    try {
        let { fullName, email, phone, bio } = req.body;

        if(!fullName || typeof fullName !== "string" || fullName.trim().length < 2){
            return res.status(401).json({message: "fullname should not be less than two"});
        }
        
        if(!email || typeof fullName !== "string" || email.trim().length < 6 || !email.includes("@")){
            return res.status(401).json({message: "enter a valid email email address"});
        }

        
        if(!phone || typeof phone !== "string" || phone.trim().length < 9){
            return res.status(401).json({message: "phone number should be more than 8 characters"});
        }

        
        if(!bio || typeof bio !== "string" || bio.trim().length < 5){
            return res.status(401).json({message: "bio should be more than 4 characters"});
        }

        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: "failed to validation profile update values"});  
      }
}

export let validateContact = (req, res, next)=>{

    let {name, phone} = req.body;

    if(!name || name.trim().length < 2 || typeof name !== "string"){
        return res.status(404).json({message: "name must be more than two characters"});
    }

    if(!phone || phone.trim().length < 9 || typeof phone !== "string"){
        return res.status(404).json({message: "phone number must be more than 8 characters"});
    }

    next();
}