<?php
/**
 * https://www.yiiframework.com/doc/guide/2.0/en/structure-assets
 */

namespace fhnw\modules\games\flappybird\assets;

use fhnw\modules\gamecenter\components\GameAssets;

/**
 *
 */
class FlappyBirdAssets extends GameAssets
{

  /**
   * @var array $css list of CSS files that this bundle contains.
   *                 Each CSS file can be specified in one of the three formats as explained in [[js]].
   *                 Note that only a forward slash "/" should be used as directory separator.
   */
  public $css = ['css/flappy-bird.css'];

  /**
   * @var array $depends list of bundle class names that this bundle depends on.
   *                     For example:
   *                     ```php
   *                     public $depends = [
   *                     'yii\web\YiiAsset',
   *                     'yii\bootstrap\BootstrapAsset',
   *                     ];
   *                     ```
   */

  public $depends = [CreateJSAssets::class];

  /**
   * @var array $js   list of JavaScript files that this bundle contains. Each JavaScript file can be specified in one of the following
   *                  formats:
   *                  - an absolute URL representing an external asset.
   *                  For example, `https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js`.
   *                  - a relative path representing a local asset (e.g. `js/main.js`).
   *                  The actual file path of a local asset can be determined by prefixing [[basePath]] to the relative path, and the
   *                  actual URL of the asset can be determined by prefixing [[baseUrl]] to the relative path.
   *                  - an array, with the first entry being the URL or relative path as described before, and a list of key => value pairs
   *                  that will be used to overwrite [[jsOptions]] settings for this entry.
   *                  This functionality is available since version 2.0.7.
   *                  Note that only a forward slash "/" should be used as directory separator.
   */
  public $js = ['js/ndgmr.js', 'js/flappy-bird.ts'];

  /**
   * @var string $sourcePath defines the path of your module assets
   * @inheritdoc
   */
  public $sourcePath = '@flappy-bird/resources';

}
