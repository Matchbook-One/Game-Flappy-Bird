<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 * @since   1.0.0
 * @var \humhub\modules\ui\view\components\View $this
 * @var string $assetUrl
 */

use fhnw\modules\games\flappybird\assets\CreateJSAssets;
use fhnw\modules\games\flappybird\assets\FlappyBirdAssets;

CreateJSAssets::register($this);
FlappyBirdAssets::register($this);

$this->registerCss('flappy-bird');
$this->registerJsConfig(
  'flappy-bird',
  [
    'assetUrl' => $assetUrl,
    'player'   => Yii::$app->user->id
  ]
);
?>

<div class="container">
  <canvas id="game" width="768" height="1024"></canvas>
</div>
