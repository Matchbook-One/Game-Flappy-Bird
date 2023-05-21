<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

namespace fhnw\modules\games\flappybird;

use fhnw\modules\gamecenter\components\GameModule;
use fhnw\modules\gamecenter\models\Leaderboard;
use yii\helpers\Url;

/**
 * @property-read string[] $contentContainerTypes
 * @property-read string $configUrl
 * @phpstan-import-type GameConfig from GameModule
 * @phpstan-import-type AchievementConfig from GameModule
 * @package FlappyBird
 */
class FlappyBirdModule extends GameModule
{

  /**
   * @phpstan-return AchievementConfig[]
   * @return array
   */
  public function getAchievementConfig(): array
  {
    return [
      [
        'name'        => 'first-game',
        'title'       => 'Win your first game',
        'description' => 'Win your first game'
      ],
      [
        'name'        => 'week-streak',
        'title'       => 'Play daily for a Week',
        'description' => 'Play Flappy bird every day for 7 days in a row'
      ]
    ];
  }

  /**
   * @inheritdoc
   * @return string the url
   * @noinspection PhpMissingParentCallCommonInspection
   */
  public function getConfigUrl(): string
  {
    return Url::to(['/flappy-bird/admin']);
  }

  /**
   * @inheritdoc
   * @return GameConfig
   */
  public function getGameConfig(): array
  {
    return [
      'title'       => 'Flappy Bird',
      'description' => 'The Game Flappy Bird',
      'tags'        => ['platform', 'bird']
    ];
  }

  /**
   * @inheritdoc
   * @return string
   */
  public function getGameUrl(): string
  {
    return Url::to(['/flappy-bird/index']);
  }

  /**
   * @return string[]
   */
  public function getLeaderBoardConfig(): array
  {
    return [
      Leaderboard::CLASSIC,
      Leaderboard::RECURRING_WEEKLY
    ];
  }

}
