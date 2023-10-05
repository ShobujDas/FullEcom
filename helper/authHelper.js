const bcrypt = require('bcrypt');

exports.hashPassword = async(password)=>{
   try {
      const saltRound = 10;
      const hashedPassword  = await bcrypt.hash(password,saltRound) 
      return hashedPassword;
   } catch (error) {
      console.log(error);
      
   }
}


// exports.hashPassword = (password) => {
//    return new Promise(async (resolve, reject) => {
//       try {
//          // Generate a salt with 12 rounds
//          const salt = await bcrypt.genSalt(12);
         
//          // Hash the password using the generated salt
//          const hashedPassword = await bcrypt.hash(password, salt);

//          resolve(hashedPassword);
//       } catch (error) {
//          reject(error);
//       }
//    });
// };




// exports.hashPassword = (password)=>{
//    return new Promise((resolve,reject)=>{
//       bcrypt.genSalt(12,(err,salt)=>{
//          if(err){
//             reject(err);
//          };
//          bcrypt.hash(password,salt,(err,hash)=>{
//             if(err){
//                reject(err);
//             }
//             resolve(hash);
//          })
//       })
//    });
   
// }



exports.comparePassword = async (password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword)


}





