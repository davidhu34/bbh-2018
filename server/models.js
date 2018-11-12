module.exports = ( mongoose ) => {
    const { Schema } = mongoose

    mongoose.model( 'Program', new Schema({
        id: String,
        day: String,
        data: String,
    }))
    return {
        Program: mongoose.model('Program')
    }
}
