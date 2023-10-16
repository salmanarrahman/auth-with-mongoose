import config from './config'
import app from './app'
import mongoose from 'mongoose'



async function bootstrap () {
    try{
        await mongoose.connect(config.database_url as string)
        console.log(`Database Connected`);

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })

    }catch(error){
        console.log(error)
    }
}

bootstrap()

