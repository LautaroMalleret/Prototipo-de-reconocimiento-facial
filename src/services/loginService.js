import supabase from "../config/db.js";

export const nuevoLogin = async ({ email, password }) => {
    try{
          const { data, error } = await supabase.from("logins")
          .select("*")
          .eq("email", email)
          .eq("password", password)
          .single();
        if(error || !data){
            return false
        }
        return true
    }catch(error){
        throw error
    }
}

