<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 * @var \humhub\modules\ui\view\components\View $this
 */

use fhnw\modules\games\flappybird\assets\CreateJSAssets;
use fhnw\modules\games\flappybird\assets\FlappyBirdAssets;

CreateJSAssets::register($this);
FlappyBirdAssets::register($this);

$assetModule = Yii::$app->getModule('flappy-bird');

$this->registerCss('flappy-bird');
$this->registerJsConfig('flappy-bird', [
  'assetUrl' => $assetModule->getAssetsUrl()
]);
?>

<div class="container">
  <canvas id="game" width="768" height="1024"></canvas>
</div>
