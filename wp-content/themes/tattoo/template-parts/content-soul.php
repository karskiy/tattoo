<div id="soul" class="site-about py-0 py-lg-5">
    <div class="container-fluid container-md">
        <div class="row">
            <div class="col-12 col-md-6">
                <?php echo get_the_post_thumbnail(75, 'full', array('id' => 'soul-img', 'class' => 'mb-4 mb-md-0')); ?>
            </div>
            <div class="col-12 col-md-5 offset-0 offset-md-1">
                <?php
                echo '<h2 class="mb-5 mt-5 mt-sm-0 display-4">' . get_post_field('post_title', 75) . '</h2>';
                $content = apply_filters('the_content', get_post_field('post_content', 75));
                echo $content;
                ?>
            </div>
        </div>
    </div>
</div><!-- #soul -->