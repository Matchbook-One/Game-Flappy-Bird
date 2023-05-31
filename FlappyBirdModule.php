<?php
/**
 * @package FlappyBird
 * @author  Christian Seiler <christian@christianseiler.ch>
 */

namespace fhnw\modules\games\flappybird;

use fhnw\modules\gamecenter\components\GameModule;
use fhnw\modules\gamecenter\components\LeaderboardType;
use JetBrains\PhpStorm\ArrayShape;
use yii\helpers\Url;

/**
 * @property-read string[] $contentContainerTypes
 * @property-read string   $configUrl
 * @phpstan-import-type GameConfig from GameModule
 * @phpstan-import-type AchievementConfig from GameModule
 * @package FlappyBird
 */
class FlappyBirdModule extends GameModule
{

  /**
   * @return array
   */
  #[ArrayShape([['name' => 'string', 'title' => 'string', 'description' => 'string', 'secret' => 'bool', 'show_progress' => 'bool']])]
  public function getAchievementConfig(): array
  {
    return [
      [
        'name'        => 'first-game',
        'title'       => 'Win your first game',
        'description' => 'Win your first game',
        'secret'      => true
      ],
      [
        'name'          => 'week-streak',
        'title'         => 'Play daily for a Week',
        'description'   => 'Play Flappy bird every day for 7 days in a row',
        'show_progress' => true
      ]
    ];
  }

  /**
   * @inheritdoc
   * @return GameConfig
   */
  #[ArrayShape(['title' => 'string', 'description' => 'string', 'tags' => 'string[]'])]
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
   * @return LeaderboardType[]
   */
  public function getLeaderBoardConfig(): array
  {
    return [
      LeaderboardType::CLASSIC,
      LeaderboardType::RECURRING_WEEKLY
    ];
  }

}
