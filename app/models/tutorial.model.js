module.exports = mongoose => {

    var schema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean
        },
        { 
            timestamps: true 
        }
    );

    // overide toJSON method that maps the default object to a custom object
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model("tutorial", schema);
    return Tutorial;
};