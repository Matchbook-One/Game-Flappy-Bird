<?php

namespace fhnw\modules\games\flappybird\assets;

use fhnw\modules\gamecenter\components\GameAssets;

/**
 *
 */
class CreateJSAssets extends GameAssets
{

  /**
   * @inheritDoc
   * @return void
   */
  public function init(): void
  {
    $version = '1.0.0';
    $file = YII_ENV_DEV ? 'createjs.js' : 'createjs.min.js';
    $this->js[] = "https://code.createjs.com/$version/$file";
    parent::init();
  }

}
