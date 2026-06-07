import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::article.article",
    ({ strapi }) => ({

        async create(ctx) {

            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized();
            }

            const { data } = ctx.request.body;

            const article =
                await strapi.entityService.create(
                    "api::article.article",
                    {
                        data: {
                            ...data,
                            postedBy: user.id,
                        },
                        populate: "*",
                    }
                );

            return { data: article };
        },

        async update(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized();
            }

            const { documentId } = ctx.params;

            const article = await strapi.documents(
                "api::article.article"
            ).findOne({
                documentId,
                populate: ["postedBy"],
            });

            if (!article) {
                return ctx.notFound();
            }

            if (article.postedBy?.id !== user.id) {
                return ctx.forbidden(
                    "You can only update your own article"
                );
            }

            return await super.update(ctx);
        },

        async delete(ctx) {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized();
            }

            const { id } = ctx.params;
            
            const article = await strapi.documents(
                "api::article.article"
            ).findOne({
                documentId: id,
                populate: ["postedBy"],
            });

            if (!article) {
                return ctx.notFound();
            }

            if (article.postedBy?.id !== user.id) {
                return ctx.forbidden(
                    "You can only delete your own article"
                );
            }

            return await super.delete(ctx);
        },
    })
);