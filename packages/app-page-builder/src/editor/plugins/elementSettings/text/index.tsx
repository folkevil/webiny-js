import React from "react";
import { PbEditorPageElementStyleSettingsPlugin } from "@webiny/app-page-builder/types";
import TextSettings from "./TextSettings";

export default {
    name: "pb-editor-page-element-style-settings-text",
    type: "pb-editor-page-element-style-settings",
    render({ options }) {
        return <TextSettings options={options} />;
    }
} as PbEditorPageElementStyleSettingsPlugin;
