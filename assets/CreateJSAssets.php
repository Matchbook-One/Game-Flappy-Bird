<?php

namespace fhnw\modules\games\flappybird\assets;

use humhub\components\assets\AssetBundle;
use yii\web\View;

/**
 * @see https://createjs.com
 */
class CreateJSAssets extends AssetBundle
{

  /**
   * @var array $js   list of JavaScript files that this bundle contains.
   *                  Each JavaScript file can be specified in one of the following formats:
   *                  - an absolute URL representing an external asset.
   *                  For example, `https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js` or
   *                  `//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js`.
   *                  - a relative path representing a local asset (e.g. `js/main.js`).
   *                  The actual file path of a local asset can be determined by prefixing [[basePath]] to the relative path, and the
   *                  actual URL of the asset can be determined by prefixing [[baseUrl]] to the relative path.
   *                  - an array, with the first entry being the URL or relative path as described before, and a list of key => value pairs
   *                  that will be used to overwrite [[jsOptions]] settings for this entry.
   *                  This functionality is available since version 2.0.7.
   *                  Note that only a forward slash "/" should be used as directory separator.
   */
  public $js = [
    'https://code.createjs.com/1.0.0/createjs.js'
  ];

  /**
   * @var int $jsPosition can be used to set `$publishOptions['position']`.
   *                      This property will only have an affect if the publishOption is not already set explicitly.
   */
  public $jsPosition = View::POS_HEAD;
}
