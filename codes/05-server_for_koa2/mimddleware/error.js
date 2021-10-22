const error = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.body = {
            message: '服务器出错',
            error: err.message
        }
    }
}

module.exports = error;
