import homePageService from "../services/homePageService";

const searchCourse = async (req, res) => {
    try {
        let info = await homePageService.searchCourse(req.query.name);
        if (info.errCode === 1) {
            return res.status(401).json(info);
        }
        return res.status(200).json(info);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

module.exports = {
    searchCourse
}