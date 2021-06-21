class Job {
    constructor(
        id,
        company,
        type,
        logoUrl,
        url,
        position,
        location,
        category,
        description,
        howApply,
        email,
        poster
    ) {
        this.id = id;
        this.company = company;
        this.type = type;
        this.logoUrl = logoUrl;
        this.url = url;
        this.position = position;
        this.location = location;
        this.category = category;
        this.description = description;
        this.howApply = howApply;
        this.email = email;
        this.poster = poster;
    }
}

module.exports = Job;
