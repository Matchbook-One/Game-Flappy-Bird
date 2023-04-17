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

/** @var \fhnw\modules\games\flappybird\FlappyBirdModule $module */
$module = Yii::$app->getModule('flappy-bird');
$game = $module->getGame();
$highscore = $game->getHighscore();
$score = $highscore ? $highscore->score : 0;

$this->registerCss('flappy-bird');

$this->registerJsConfig('flappy-bird', [
  'assetUrl'  => $module->getAssetsUrl(),
  'user'      => Yii::$app->user->id,
  'highscore' => $score
]);
?>

<div class="container">
  <canvas id="game" width="768" height="1024"></canvas>
</div>
