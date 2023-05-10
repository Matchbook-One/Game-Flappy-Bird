<?php

namespace fhnw\modules\games\flappybird\controllers;

use fhnw\modules\games\flappybird\FlappyBirdModule;
use humhub\components\Controller;

/**
 * @package FlappyBird/Controllers
 */
class IndexController extends Controller
{
  /**
   * Renders the index view for the module
   *
   * @return string
   */
  public function actionIndex(): string
  {
    $module = FlappyBirdModule::getInstance();
    $highscore = $module->getGame()->getHighscore();

    return $this->render(
      'index', [
               'assetUrl' => $module->getAssetsUrl(),
               'score'    => $highscore ? $highscore->score : 0
             ]
    );
  }

}
