const hasAccessProfile = require("../../utils/hasAccessProfile")

exports.getPage = async (req, res, next) => {
    try {

        const user = req.user
        const { userName } = req.params

        const isAccess = await hasAccessProfile(user.username, userName)

        if (isAccess == "page not found") {
            return res.render("error/404")
        }

        if (!isAccess) {
            req.flash("error", "this page is private")
            return res.render("pages/index", {
                private: Boolean(isAccess)
            })
        }

        return res.render("pages/index", {
            private: Boolean(isAccess)
        })

    } catch (error) {
        next(error)
    }
}