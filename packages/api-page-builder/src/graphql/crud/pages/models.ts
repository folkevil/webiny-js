import { withFields, string, fields, onSet } from "@commodo/fields";
import { object } from "commodo-fields-object";
import { validation } from "@webiny/validation";
import Error from "@webiny/error";
import trimStart from "lodash/trimStart";

export const CreateDataModel = withFields({
    category: string({ validation: validation.create("required,maxLength:100") })
})();

export const UpdateDataModel = withFields({
    title: string({
        validation: validation.create("maxLength:150")
    }),
    path: onSet(value => {
        // Ensure path starts with a single "/" character.
        if (typeof value === "string") {
            value = "/" + trimStart(value, "/");
        }
        return value;
    })(
        string({
            validation: validation.create("maxLength:100")
        })
    ),
    category: string({ validation: validation.create("maxLength:100") }),
    content: object()
})();

export const UpdateSettingsModel = withFields({
    general: fields({
        value: {},
        instanceOf: withFields({
            tags: string({
                list: true,
                validation: value => {
                    if (!Array.isArray(value)) {
                        return;
                    }

                    if (value.length > 30) {
                        throw new Error("Cannot store more than 30 tags.");
                    }

                    for (let i = 0; i < value.length; i++) {
                        validation.validateSync(value[i], "maxLength:50");
                    }
                }
            }),
            snippet: string({ validation: validation.create("maxLength:500") }),
            layout: string({ validation: validation.create("maxLength:50") }),
            image: object()
        })()
    }),
    seo: fields({
        value: {},
        instanceOf: withFields({
            title: string({ validation: validation.create("maxLength:500") }),
            description: string({ validation: validation.create("maxLength:500") }),
            meta: fields({
                list: true,
                value: [],
                validation: value => {
                    if (!Array.isArray(value)) {
                        return;
                    }

                    if (value.length > 30) {
                        throw new Error("Cannot store more than 30 SEO tags.");
                    }
                    for (let i = 0; i < value.length; i++) {
                        validation.validateSync(value[i], "maxLength:50");
                    }
                },
                instanceOf: withFields({
                    name: string({ validation: validation.create("maxLength:100") }),
                    content: string({ validation: validation.create("maxLength:200") })
                })()
            })
        })()
    }),
    social: fields({
        value: {},
        instanceOf: withFields({
            meta: fields({
                value: [],
                list: true,
                validation: value => {
                    if (!Array.isArray(value)) {
                        return;
                    }

                    if (value.length > 30) {
                        throw new Error("Cannot store more than 30 social tags.");
                    }
                    for (let i = 0; i < value.length; i++) {
                        validation.validateSync(value[i], "maxLength:50");
                    }
                },
                instanceOf: withFields({
                    property: string({ validation: validation.create("maxLength:100") }),
                    content: string({ validation: validation.create("maxLength:200") })
                })()
            }),
            title: string({ validation: validation.create("maxLength:500") }),
            description: string({ validation: validation.create("maxLength:500") }),
            image: object()
        })()
    })
})();
