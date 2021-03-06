import * as Phaser from 'phaser';
import { LoadAssets } from "./scenes/LoadAssets";
import { FirstLevel } from "./scenes/FirstLevel";

import { Plugins } from '@capacitor/core';
import { SCREEN_WIDE, SCREEN_RATIO } from './constants';
import { readFile, writeFile } from './util/file-ops';
import { Hud } from './scenes/Hud';
import { Title } from './scenes/Title';

const config: Phaser.Types.Core.GameConfig = {
    parent: 'game',
    type: Phaser.AUTO,
    backgroundColor: '#000',
    // Example of sizing based on w/h ratio
    width: 1600,
    height: 800,
    zoom: 1,
    dom: {
        createContainer: true
    },
    render: {
        pixelArt: true,
        roundPixels: true
    },
    scale: {
        mode: Phaser.Scale.FIT
    },
    physics:{
        default: "arcade",
        arcade:{ 
            debug: false,
            gravity: {y: 750},
            tileBias: 96
        },
    }
    
};

const { StatusBar, SplashScreen } = Plugins;

export class KTGame extends Phaser.Game {

    constructor(config: Phaser.Types.Core.GameConfig) {

        super(config);

        console.log(config);

        // Example of scene management
        this.scene.add("LoadAssets", LoadAssets, true);
        this.scene.add("Title", Title, false)
        this.scene.add("FirstLevel", FirstLevel, false);
        this.scene.add("Hud", Hud, false);

        // File-ops write test
        writeFile(
            {
                location: 'app',
                filePath: 'kt_fileops_test.txt',
                webResolve: 'ram'
            },
            "Hello there"
        ).then(
            () => {
                // File-ops read test
                readFile(
                    {
                        location: 'app',
                        filePath: 'kt_fileops_test.txt',
                        webResolve: 'ram'
                    }
                ).then(
                    text => console.log("File read: ", text)
                );
            });

        StatusBar.hide();
        SplashScreen.hide();

    }

}

new KTGame(config);