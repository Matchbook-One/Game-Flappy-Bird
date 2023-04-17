<?php

namespace fhnw\modules\games\flappybird\controllers;

use humhub\components\Controller;

class IndexController extends Controller
{
  /**
   * Renders the index view for the module
   *
   * @return string
   */
  public function actionIndex(): string
  {
    return $this->render('index');
  }

}
