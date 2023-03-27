<?php

namespace fhnw\modules\games\flappybird\assets;

use humhub\components\assets\AssetBundle;
use yii\web\View;

class Assets extends AssetBundle
{
  public $css = ['css/flappybird.css'];
  public $depends = [P5Assets::class];
  public $js = ['js/flappybird.js'];
  /**
   * @var array defines where the js files are included into the page, note your custom js files should be included after the core files
   *      (which are included in head)
   * @inheritdoc
   */
  public $jsOptions = ['position' => View::POS_END];
  /**
   * @var array $publishOptions change forceCopy to true when testing your js in order to rebuild this assets on every request (otherwise
   *                            they will be cached)
   * @inheritdoc
   */
  public $publishOptions = ['forceCopy' => true];
  /**
   * @var string $sourcePath defines the path of your module assets
   * @inheritdoc
   */
  public $sourcePath = '@flappy-bird/resources';
}
